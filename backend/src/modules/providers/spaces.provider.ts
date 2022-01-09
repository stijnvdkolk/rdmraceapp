import { Injectable } from '@nestjs/common';
import { Attachment, Message, User } from '@prisma/client';
import { S3 } from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

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
    const path = `attachments/${message.channelId}/${
      message.id
    }/${file.originalname
      .replace(/[\/\?<>\\:\*\|"]/g, '_')
      .replace(/[\x00-\x1f\x80-\x9f]/g, '_')
      .replace(/^\.+$/, '_')
      .replace(/[\. ]+$/, '_')
      .replace(' ', '_')}`;
    return {
      upload: await this.s3
        .upload({
          Bucket: process.env.SPACES_BUCKET,
          Key: path,
          ACL: 'public-read',
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise(),
      path,
    };
  }

  // TODO: cache old attachment? slow delete?!
  async deleteAttachment(attachmentUrl: string) {
    return this.s3
      .deleteObject({
        Bucket: process.env.SPACES_BUCKET,
        Key: attachmentUrl,
      })
      .promise();
  }

  async uploadProfilePicture(
    user: Pick<User, 'id'>,
    file: Express.Multer.File,
  ) {
    const profilePicture = `${uuidv4()}.${file.originalname.split('.').pop()}`;
    const name = `avatars/${user.id}/${profilePicture}`;
    return {
      upload: await this.s3
        .upload({
          Bucket: process.env.SPACES_BUCKET,
          Key: name,
          ACL: 'public-read',
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise(),
      profilePictureId: profilePicture,
    };
  }

  // TODO: cache old profilepicture? slow delete?!
  async deleteProfilePicture(user: Pick<User, 'profilePicture' | 'id'>) {
    const name = `avatars/${user.id}/${user.profilePicture}`;
    return this.s3
      .deleteObject({
        Bucket: process.env.SPACES_BUCKET,
        Key: name,
      })
      .promise();
  }
}
