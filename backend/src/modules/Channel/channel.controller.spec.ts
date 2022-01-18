import { Test } from '@nestjs/testing';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import {
  adminUser,
  channels,
  currentUser,
  messages,
  privateChannel,
  testUser,
} from '@lib/unit-tests';
import { ForbiddenException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@prisma/client';
import { NotFoundError } from '@lib/errors';

describe('ChannelController', () => {
  let controller: ChannelController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [ChannelController],
      providers: [
        {
          provide: ChannelService,
          useValue: {
            getChannelById: jest
              .fn()
              .mockImplementation((channelId: string) => {
                const channel = channels.find(
                  (channel) => channel.id === channelId,
                );
                if (!channel) throw new NotFoundError('channel_not_found');
                return channel;
              }),
            getChannels: jest.fn().mockImplementation(() => {
              return channels;
            }),
            getMessagesFromChannel: jest.fn().mockImplementation(() => {
              return messages;
            }),
            getMessageFromChannel: jest.fn().mockImplementation(() => {
              return messages[0];
            }),
            createMessage: jest
              .fn()
              .mockImplementation(
                (
                  channelid: string,
                  authorId: string,
                  content: string,
                  attachments: { name: string }[],
                ) => {
                  const message = messages[0];
                  message.channel.id = channelid;
                  message.author.id = authorId;
                  message.content = content;
                  message.attachments = attachments.map((file) => ({
                    id: uuidv4(),
                    name: file.name,
                  }));
                  return message;
                },
              ),
            updateMessage: jest
              .fn()
              .mockImplementation(
                (messageId: string, data: { content: string }) => {
                  const message = messages[0];
                  message.content = data.content;
                  message.id = messageId;
                  return message;
                },
              ),
            deleteMessage: jest.fn().mockImplementation((messageId: string) => {
              const message = messages[0];
              message.id = messageId;
              return message;
            }),
            uploadAttachment: jest.fn().mockImplementation(() => {
              return null;
            }),
            deleteAttachment: jest.fn().mockImplementation(() => {
              return null;
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<ChannelController>(ChannelController);
    return;
  });

  // Testing the findChannelById method
  describe('getChannel', () => {
    it('should return a channel with the current id', async () => {
      const channel = await controller.getChannel(channels[0].id);
      expect(channel).toEqual(channels[0]);
    });
  });

  describe('getChannels', () => {
    it('should be defined', async () => {
      const channels = await controller.getChannels(currentUser, {});
      expect(channels).toBeDefined();
    });

    it('should return an array of channels', async () => {
      const channels = await controller.getChannels(currentUser, {});
      expect(Array.isArray(channels)).toBeTruthy();
    });

    it('should only channels the user has access to', async () => {
      const channels = await controller.getChannels(currentUser, {});
      expect(
        channels.filter((channel) => {
          if (
            channel.type === 'PUBLIC_CHANNEL' ||
            channel.type === 'NEWS_CHANNEL'
          )
            return true;
          if (channel.type === 'PRIVATE_CHANNEL')
            return channel.rolesAccess.includes(currentUser.role);
          return false;
        }).length,
      ).toEqual(channels.length);
    });

    it('should return the channels correctly sorted', async () => {
      const channels = await controller.getChannels(currentUser, {});
      expect(
        channels.sort((a, b) => {
          if (a.type === b.type) return 0;
          if (a.type === 'NEWS_CHANNEL') return -1;
          if (b.type === 'PRIVATE_CHANNEL') return 1;
          return 0;
        }),
      ).toEqual(channels);
    });

    it('should return the channels correctly sorted as admin', async () => {
      const channels = await controller.getChannels(adminUser, {});
      expect(
        channels.sort((a, b) => {
          if (a.type === b.type) return 0;
          if (a.type === 'NEWS_CHANNEL') return -1;
          if (b.type === 'PRIVATE_CHANNEL') return 1;
          return 0;
        }),
      ).toEqual(channels);
    });
  });

  describe('getChannelMessages', () => {
    it('should be defined', async () => {
      const messages = await controller.getChannelMessages(
        currentUser,
        channels[0].id,
        {},
      );
      expect(messages).toBeDefined();
    });

    it('should return an array of messages', async () => {
      const messages = await controller.getChannelMessages(
        currentUser,
        channels[0].id,
        {},
      );
      expect(Array.isArray(messages)).toBeTruthy();
    });

    it('should only return the messages if the channel exists', async () => {
      expect(
        controller.getChannelMessages(currentUser, 'fake-channel-id', {}),
      ).rejects.toThrowError(new NotFoundError('channel_not_found'));
    });

    it('should only return the messages if the user has access to the channel', async () => {
      expect(
        controller.getChannelMessages(currentUser, privateChannel.id, {}),
      ).rejects.toThrowError(new ForbiddenException('not_allowed'));
    });
  });

  describe('getChannelMessage', () => {
    it('should be defined', async () => {
      const message = await controller.getChannelMessage(
        currentUser,
        channels[0].id,
        messages[0].id,
      );
      expect(message).toBeDefined();
    });

    it('should return a message', async () => {
      const message = await controller.getChannelMessage(
        currentUser,
        channels[0].id,
        messages[0].id,
      );
      expect(message).toEqual(messages[0]);
    });

    it('should only return the message if the channel exists', async () => {
      expect(
        controller.getChannelMessage(currentUser, 'fake-channel-id', 'fake-id'),
      ).rejects.toThrowError(new NotFoundError('channel_not_found'));
    });

    it('should only return the message if the user has access to the channel', async () => {
      expect(
        controller.getChannelMessage(currentUser, privateChannel.id, 'fake-id'),
      ).rejects.toThrowError(new ForbiddenException('not_allowed'));
    });
  });

  describe('createChannelMessage', () => {
    it('should be defined', async () => {
      const message = await controller.createChannelMessage(
        channels[0].id,
        currentUser,
        [],
        {
          content: 'test',
        },
      );
      expect(message).toBeDefined();
    });

    it('should only create the message if the user has access to the channel', async () => {
      expect(
        controller.createChannelMessage(privateChannel.id, currentUser, [], {
          content: 'test',
        }),
      ).rejects.toThrowError(new ForbiddenException('not_allowed'));
    });

    it('should return the message', async () => {
      const message = await controller.createChannelMessage(
        channels[0].id,
        currentUser,
        [],
        {
          content: messages[0].content,
        },
      );
      expect(message).toEqual(messages[0]);
    });

    it('should work with an attachment and no content', async () => {
      const message = await controller.createChannelMessage(
        channels[0].id,
        currentUser,
        [
          {
            originalname: 'test.png',
            mimetype: null,
            fieldname: null,
            buffer: null,
            encoding: null,
            size: null,
            destination: null,
            filename: null,
            path: null,
            stream: null,
          },
        ],
        {},
      );

      expect(message.attachments.length).toEqual(1);
      expect(message.attachments[0].name).toEqual('test.png');
      expect(message.content).toEqual(undefined);
    });

    it('should work with an attachment and content', async () => {
      const message = await controller.createChannelMessage(
        channels[0].id,
        currentUser,
        [
          {
            originalname: 'test.png',
            mimetype: null,
            fieldname: null,
            buffer: null,
            encoding: null,
            size: null,
            destination: null,
            filename: null,
            path: null,
            stream: null,
          },
        ],
        {
          content: 'test',
        },
      );

      expect(message.attachments.length).toEqual(1);
      expect(message.attachments[0].name).toEqual('test.png');
      expect(message.content).toEqual('test');
    });

    it('should work with multiple attachments', async () => {
      const message = await controller.createChannelMessage(
        channels[0].id,
        currentUser,
        [
          {
            originalname: 'test.png',
            mimetype: null,
            fieldname: null,
            buffer: null,
            encoding: null,
            size: null,
            destination: null,
            filename: null,
            path: null,
            stream: null,
          },
          {
            originalname: 'test2.png',
            mimetype: null,
            fieldname: null,
            buffer: null,
            encoding: null,
            size: null,
            destination: null,
            filename: null,
            path: null,
            stream: null,
          },
        ],
        {
          content: 'test',
        },
      );

      expect(message.attachments.length).toEqual(2);
      expect(message.attachments[0].name).toEqual('test.png');
      expect(message.attachments[1].name).toEqual('test2.png');
      expect(message.content).toEqual('test');
    });
  });

  describe('updateChannelMessage', () => {
    it('should be defined', async () => {
      const message = await controller.updateChannelMessage(
        channels[0].id,
        messages[0].id,
        currentUser,
        { content: 'messageText' },
      );
      expect(message).toBeDefined();
    });

    it('should throw if channel doesnt exists', async () => {
      expect(
        controller.updateChannelMessage(
          'fake-channel-id',
          messages[0].id,
          currentUser,
          { content: 'messageText' },
        ),
      ).rejects.toThrowError(new ForbiddenException('channel_not_found'));
    });

    it('should only update the message if the user has access to the channel', async () => {
      expect(
        controller.updateChannelMessage(
          privateChannel.id,
          messages[0].id,
          currentUser,
          { content: 'messageText' },
        ),
      ).rejects.toThrowError(new ForbiddenException('not_allowed'));
    });

    it('should only allow users to update their own message', async () => {
      expect(
        controller.updateChannelMessage(
          channels[0].id,
          messages[0].id,
          testUser as User,
          { content: 'messageText' },
        ),
      ).rejects.toThrowError(new ForbiddenException('not_allowed'));
    });

    it('should return the message', async () => {
      const message = await controller.updateChannelMessage(
        channels[0].id,
        messages[0].id,
        currentUser,
        { content: 'messageText' },
      );
      const msg = messages[0];
      msg.content = 'messageText';
      expect(message).toEqual(msg);
    });
  });

  describe('deleteChannelMessage', () => {
    it('should be defined', async () => {
      const message = await controller.deleteChannelMessage(
        channels[0].id,
        messages[0].id,
        currentUser,
      );
      expect(message).toBeDefined();
    });

    it('should throw if channel doesnt exists', async () => {
      expect(
        controller.deleteChannelMessage(
          'fake-channel-id',
          messages[0].id,
          currentUser,
        ),
      ).rejects.toThrowError(new NotFoundError('channel_not_found'));
    });

    it('should only delete the message if the user has access to the channel', async () => {
      expect(
        controller.deleteChannelMessage(
          privateChannel.id,
          messages[0].id,
          currentUser,
        ),
      ).rejects.toThrowError(new ForbiddenException('not_allowed'));
    });

    it('should only be able to delete their own message', async () => {
      expect(
        controller.deleteChannelMessage(
          channels[0].id,
          messages[0].id,
          testUser as User,
        ),
      ).rejects.toThrowError(new ForbiddenException('not_allowed'));
    });

    it('admins should be able to delete any message', async () => {
      expect(
        controller.deleteChannelMessage(
          channels[0].id,
          messages[0].id,
          adminUser,
        ),
      ).toBeDefined();
    });
  });
});
