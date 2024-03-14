import ftp from 'basic-ftp';
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
      await this.client.uploadFrom(source, target);
    }
  }

  close(): void {
    this.client.close();
  }
}
