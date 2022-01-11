import { Test } from '@nestjs/testing';
import { ChannelType, UserRole, UserStatus } from '@prisma/client';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { v4 as uuidv4 } from 'uuid';

// Create a new channel
const channelId = uuidv4();
const name = 'Test channel';
const type = ChannelType.PUBLIC_CHANNEL;
const rolesAccess = [UserRole.ADMIN, UserRole.TEAM_MEMBER];
const createdAt = new Date('2022-01-07T12:27:08.486Z');
const updatedAt = new Date('2022-01-07T12:27:08.486Z');

// Define message type [Message PRISMA model]
type Message = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  author: {
    id: string;
    createdAt: Date;
    username: string;
    profilePicture: string;
    status: UserStatus;
    aboutMe: string;
    role: UserRole;
  };
  attachments: {
    id: string;
    name: string;
  }[];
  channel: {
    id: string;
    name: string;
    type: ChannelType;
    createdAt: Date;
  };
};

// Define channel type [Channel PRISMA model]
type Channel = {
  id: string;
  name: string;
  type: ChannelType;
  rolesAccess: UserRole[];
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  messages: ChannelMessage[];
};

// Define test message
const messages: Message[] = [
  {
    id: uuidv4(),
    content: 'This is a test message',
    createdAt,
    updatedAt,
    attachments: [
      {
        id: uuidv4(),
        name: 'test.txt',
      },
    ],
    author: {
      aboutMe: 'I am a test user',
      createdAt,
      id: uuidv4(),
      profilePicture: '',
      role: UserRole.TEAM_MEMBER,
      status: UserStatus.OFFLINE,
      username: 'testuser',
    },
    channel: {
      createdAt,
      id: channelId,
      name,
      type,
    },
  },
];
// Define test channel
const channel: Channel = {
  id: channelId,
  name,
  type,
  rolesAccess,
  createdAt,
  updatedAt,
  description: 'this is a test channel',
  messages,
};

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
              .mockImplementation((_channelId: string) => {
                return channel;
              }),
            getChannelByName: jest
              .fn()
              .mockImplementation((_channelName: string) => {
                return channel;
              }),
            getChannelMessages: jest
              .fn()
              .mockImplementation((_channelId: string) => {
                return messages;
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
      expect(controller.getChannel(channelId)).toEqual(channel);
    });
  });
});
