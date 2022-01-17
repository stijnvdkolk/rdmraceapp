import { Test } from '@nestjs/testing';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import {
  channels,
  currentUser,
  messages,
  privateChannel,
} from '@lib/unit-tests';
import { ForbiddenException } from '@nestjs/common';

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
                return channels.find((channel) => channel.id === channelId);
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
            createMessage: jest.fn().mockImplementation(() => {
              return null;
            }),
            updateMessage: jest.fn().mockImplementation(() => {
              return null;
            }),
            deleteMessage: jest.fn().mockImplementation(() => {
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
      ).rejects.toThrowError(new ForbiddenException('not_allowed'));
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
      ).rejects.toThrowError(new ForbiddenException('not_allowed'));
    });

    it('should only return the message if the user has access to the channel', async () => {
      expect(
        controller.getChannelMessage(currentUser, privateChannel.id, 'fake-id'),
      ).rejects.toThrowError(new ForbiddenException('not_allowed'));
    });
  });

  describe('createChannelMessage', () => {
    test.todo('should be defined');

    test.todo(
      'should only create the message if the user has access to the channel',
    );

    test.todo('should return the message');

    test.todo('should work with an attachment and no content');

    test.todo('should work with an attachment and content');

    test.todo('should work with multiple attachments');
  });

  describe('updateChannelMessage', () => {
    test.todo('should be defined');

    test.todo('should throw if channel doesnt exists');

    test.todo(
      'should only update the message if the user has access to the channel',
    );

    test.todo('should only be able to update their own message');

    test.todo('should return the message');
  });

  describe('deleteChannelMessage', () => {
    test.todo('should be defined');

    test.todo('should throw if channel doesnt exists');

    test.todo(
      'should only delete the message if the user has access to the channel',
    );

    test.todo('should only be able to delete their own message');

    test.todo('admins should be able to delete any message');

    test.todo('should return the message');
  });
});
