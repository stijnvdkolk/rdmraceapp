import { Injectable, Inject } from '@nestjs/common';
import { Client, CopyConditions, ClientOptions } from 'minio';
import { MINIO_CONFIG_OPTIONS } from './minio.constants';

@Injectable()
export class MinioService {
  private readonly implMinioSdk: Client;
  private readonly implCopyConditions: CopyConditions;
  constructor(@Inject(MINIO_CONFIG_OPTIONS) private options: ClientOptions) {
    this.implMinioSdk = new Client(this.options);
    this.implCopyConditions = new CopyConditions();
  }

  public get client(): Client {
    return this.implMinioSdk;
  }

  public get copyConditions(): CopyConditions {
    return this.implCopyConditions;
  }
}
