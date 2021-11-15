import { MinioOptionsFactory } from '@interfaces/minio/async-options.factory.interface';
import { MinioConnectionAsyncOptions } from '@interfaces/minio/async-options.interface';
import { MinioOptions } from '@interfaces/minio/options.interface';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { MINIO_CONFIG_OPTIONS } from './minio.constants';
import { MinioService } from './minio.service';

@Module({
  providers: [MinioService],
})
export class MinioModule {
  static register(options: MinioOptions): DynamicModule {
    return {
      module: MinioModule,
      providers: [
        {
          provide: MINIO_CONFIG_OPTIONS,
          useValue: options,
        },
        MinioService,
      ],
      exports: [MinioModule, MinioService],
    };
  }
  public static registerAsync(
    options: MinioConnectionAsyncOptions,
  ): DynamicModule {
    const allImports = [...new Set([].concat(options.imports))];

    return {
      module: MinioModule,
      imports: allImports || [],
      providers: [this.createConnectAsyncProviders(options), MinioService],
      exports: [MinioModule, MinioService],
    };
  }

  private static createConnectAsyncProviders(
    options: MinioConnectionAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: MINIO_CONFIG_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    // For useClass and useExisting...
    return {
      provide: MINIO_CONFIG_OPTIONS,
      useFactory: async (optionsFactory: MinioOptionsFactory) =>
        await optionsFactory.createPiConnectionOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
