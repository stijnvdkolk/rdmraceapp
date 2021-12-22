import { Injectable } from '@nestjs/common';
import { Message } from '@prisma/client';
import { S3 } from 'aws-sdk';

@Injectable()
export class SpacesProvider {
  private s3: S3 = new S3({
    endpoint: 'https://ams3.digitaloceanspaces.com',
    region: 'ams3',
    credentials: {
      accessKeyId: process.env.SPACES_ACCESS_KEY_ID,
      secretAccessKey: process.env.SPACES_SECRET_ACCESS_KEY,
    },
  });

  async uploadAttachment(
    message: Pick<Message, 'channelId' | 'id'>,
    file: Express.Multer.File,
  ) {
    const name = `attachments/${message.channelId}/${
      message.id
    }/${file.originalname
      .replace(/[\/\?<>\\:\*\|"]/g, '_')
      .replace(/[\x00-\x1f\x80-\x9f]/g, '_')
      .replace(/^\.+$/, '_')
      .replace(/[\. ]+$/, '_')}`;
    return this.s3
      .upload({
        Bucket: process.env.SPACES_BUCKET,
        Key: name,
        ACL: 'public-read',
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();
  }
}
