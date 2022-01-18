import { SpacesProvider } from './spaces.provider';
import { v4 as uuidv4 } from 'uuid';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'uuid'),
}));

jest.mock('aws-sdk', () => ({
  S3: jest.fn(() => ({
    promise: jest.fn().mockReturnThis(),
    upload: jest.fn().mockReturnThis(),
    deleteObject: jest.fn().mockReturnThis(),
  })),
}));

describe('SpacesProvider', () => {
  let provider: SpacesProvider;

  beforeEach(() => {
    provider = new SpacesProvider();
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  it('should call upload attachment with the correct parameters', async () => {
    const message = {
      channelId: 'channel-id',
      id: 'message-id',
    };
    const file: Express.Multer.File = {
      buffer: Buffer.from('test'),
      mimetype: 'image/png',
      originalname: 'test.png',
      destination: null,
      filename: null,
      path: null,
      size: null,
      fieldname: null,
      stream: null,
      encoding: null,
    };
    const path = `attachments/${message.channelId}/${
      message.id
    }/${file.originalname
      .replace(/[\/\?<>\\:\*\|"]/g, '_')
      .replace(/[\x00-\x1f\x80-\x9f]/g, '_')
      .replace(/^\.+$/, '_')
      .replace(/[\. ]+$/, '_')
      .replace(' ', '_')}`;

    await provider.uploadAttachment(message, file);

    expect(provider.s3.upload).toHaveBeenCalledWith({
      Bucket: 'cdn-rdmraceapp',
      Key: path,
      ACL: 'public-read',
      Body: file.buffer,
      ContentType: file.mimetype,
    });
  });

  it('should call delete attachment with the correct parameters', async () => {
    const attachmentUrl = 'attachments/channel-id/message-id/test.png';

    await provider.deleteAttachment(attachmentUrl);

    expect(provider.s3.deleteObject).toHaveBeenCalledWith({
      Bucket: 'cdn-rdmraceapp',
      Key: attachmentUrl,
    });
  });

  it('should call upload profile picture with the correct parameters', async () => {
    const user = {
      id: 'user-id',
    };

    const file: Express.Multer.File = {
      buffer: Buffer.from('test'),
      mimetype: 'image/png',
      originalname: 'test.png',
      destination: null,
      filename: null,
      path: null,
      size: null,
      fieldname: null,
      stream: null,
      encoding: null,
    };

    const profilePicture = `${uuidv4()}.${file.originalname.split('.').pop()}`;
    const name = `avatars/${user.id}/${profilePicture}`;

    await provider.uploadProfilePicture(user, file);

    expect(provider.s3.upload).toHaveBeenCalledWith({
      Bucket: 'cdn-rdmraceapp',
      Key: name,
      ACL: 'public-read',
      Body: file.buffer,
      ContentType: file.mimetype,
    });
  });

  it('should call delete profile picture with the correct parameters', async () => {
    const user = {
      id: 'user-id',
      profilePicture: `${uuidv4()}.png`,
    };
    const name = `avatars/${user.id}/${user.profilePicture}`;

    await provider.deleteProfilePicture(user);

    expect(provider.s3.deleteObject).toHaveBeenCalledWith({
      Bucket: 'cdn-rdmraceapp',
      Key: name,
    });
  });
});
