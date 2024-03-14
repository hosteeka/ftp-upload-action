export interface PathOptions {
  source: string;
  target: string;
}

export interface Client {
  syncToServer(options: PathOptions[]): Promise<void>;

  close(): void;
}
