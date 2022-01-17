import { Test } from '@nestjs/testing';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { channels, currentUser, messages } from '@lib/unit-tests';

describe('ChannelController', () => {
  let controller: ChannelController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [ChannelController],
      providers: [
        {
          provide: ChannelService,
          useValue: {
            getChannelById: jest.fn().mockImplementation(() => {
              return channels[0];
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
  describe('getChannelById', () => {
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

    test.todo('should only channels the user has access to');

    test.todo('should return the channels correctly sorted');
  });

  describe('getChannelMessages', () => {
    test.todo('should be defined');

    test.todo('should return an array of messages');

    test.todo('should return the messages correctly sorted');

    test.todo('should only return the message if the channel exists');

    test.todo(
      'should only return the messages if the user has access to the channel',
    );
  });

  describe('getChannelMessage', () => {
    test.todo('should be defined');

    test.todo('should return a message');

    test.todo('should only return the message if the channel exists');

    test.todo(
      'should only return the message if the user has access to the channel',
    );
  });

  describe('createChannelMessage', () => {
    test.todo('should be defined');

    test.todo('should throw if channel doesnt exists');

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
