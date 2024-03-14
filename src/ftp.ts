import * as core from '@actions/core';
import * as ftp from 'basic-ftp';
import { type Client, type PathOptions } from './types';

export class FTPClient implements Client {
  private client: ftp.Client;

  constructor(
    host: string,
    user: string,
    password: string,
    port: number = 21,
    protocol: 'ftp' | 'ftps' = 'ftp'
  ) {
    core.debug(`Creating FTP client`);
    this.client = new ftp.Client();
    this.client.access({
      host,
      user,
      password,
      port,
      secure: protocol === 'ftps'
    });
  }

  async syncToServer(options: PathOptions[]): Promise<void> {
    for (const { source, target } of options) {
      core.debug(`Uploading ${source} to ${target}`);
      await this.client.uploadFrom(source, target);
    }
  }

  close(): void {
    this.client.close();
  }
}
