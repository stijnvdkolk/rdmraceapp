import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { MinioService } from '@modules/minio/minio.service';
import { minioConfig } from 'src/config/minio.config';
import crypto from 'node:crypto';
import { BufferedFile } from '@interfaces/minio/file.interface';

@Injectable()
export class MinioClientService {
  private readonly logger: Logger;
  private readonly baseBucket = minioConfig.bucket;

  public get client() {
    return this.minio.client;
  }

  constructor(private readonly minio: MinioService) {
    this.logger = new Logger('MinioStorageService');
  }

  public async upload(
    file: BufferedFile,
    baseBucket: string = this.baseBucket,
  ) {
    const hashedFileName = crypto
      .createHash('md5')
      .update(Date.now().toString())
      .digest('hex');
    const extention = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    await this.client.putObject(
      baseBucket,
      hashedFileName + extention,
      file.buffer,
    );

    return {
      url: `${config.MINIO_ENDPOINT}:${config.MINIO_PORT}/${config.MINIO_BUCKET}/${filename}`,
    };
  }

  async delete(objetName: string, baseBucket: string = this.baseBucket) {
    await this.client.removeObject(baseBucket, objetName);
  }
}
