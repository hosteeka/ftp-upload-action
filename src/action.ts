import * as core from '@actions/core';
import * as github from '@actions/github';

export async function run(): Promise<void> {
  try {
    let base: string | undefined;
    let head: string | undefined;

    core.debug(`Payload keys: ${Object.keys(github.context.payload)}`);

    // Check the event that triggered the action
    const eventName = github.context.eventName;
    switch (eventName) {
      case 'push':
        // Get the base and head of the Push event
        base = github.context.payload.before;
        head = github.context.payload.after;
        break;
      case 'pull_request':
        base = github.context.payload.pull_request?.base.sha;
        head = github.context.payload.pull_request?.head.sha;
        break;
      default:
        core.setFailed(`This action does not support the event ${eventName}`);
    }

    if (!base || !head) {
      core.setFailed('Could not get base and head');
      return;
    }

    core.info(`Base commit: ${base}`);
    core.info(`Head commit: ${head}`);

    const paths = core.getMultilineInput('paths');
    core.info(`Paths: ${paths}`);
  } catch (error) {
    core.setFailed(error);
  }
}
