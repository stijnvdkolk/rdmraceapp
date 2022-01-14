import { Test } from '@nestjs/testing';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { channels, messages } from '@lib/unit-tests';

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
});
