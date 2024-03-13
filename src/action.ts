import * as core from '@actions/core';
import * as github from '@actions/github';

export async function run(): Promise<void> {
  try {
    const token = core.getInput('githubToken', { required: true });

    const { eventName, repo } = github.context;

    // Get the base and head commit SHAs depending on the event that triggered
    // the action. The events that are supported are push and pull_request.

    let base: string | undefined;
    let head: string | undefined;

    if (eventName === 'push') {
      // For push events, the base is the commit before the push and the head
      // is the commit of the push.
      base = github.context.payload.before;
      head = github.context.payload.after;
    } else if (eventName === 'pull_request') {
      // For pull_request events, the base is the merge base of the base and
      // the head and the head is the head commit of the pull request.
      base = github.context.payload.pull_request?.base.sha;
      head = github.context.payload.pull_request?.head.sha;
    } else {
      core.setFailed(`This action does not support the event ${eventName}`);
      return;
    }

    if (!base || !head) {
      core.setFailed('Could not get base and head');
      return;
    }

    core.info(`Base commit: ${base}`);
    core.info(`Head commit: ${head}`);

    // Compare the two commits to get the list of files that changed.

    const octokit = github.getOctokit(token);
  } catch (error) {
    core.setFailed(error);
  }
}
