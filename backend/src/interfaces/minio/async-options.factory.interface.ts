import { MinioOptions } from './options.interface';

export interface MinioOptionsFactory {
  createPiConnectionOptions(): Promise<MinioOptions> | MinioOptions;
}
