import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

import { MinioOptions } from './options.interface';
import { MinioOptionsFactory } from './async-options.factory.interface';

export interface MinioConnectionAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<MinioOptionsFactory>;
  useClass?: Type<MinioOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<MinioOptions> | MinioOptions;
}
