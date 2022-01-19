import { ChannelType, UserRole } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { createdAt, createdAt2, updatedAt } from '.';
import { PublicChannel, Message, DMChannel } from './types';
import { users } from './user';

export const dmChannel: DMChannel = {
  id: uuidv4(),
  name: '',
  type: ChannelType.DM,
  users,
  createdAt,
  updatedAt,
};
export const dmChannels = [dmChannel, dmChannel].map((channel, i) => ({
  ...channel,
  _count: {
    messages: Math.floor(Math.random() * 10) + 1,
  },
  messages: [
    {
      createdAt: i == 1 ? createdAt : createdAt2,
    },
  ],
}));

export const publicChannel: PublicChannel = {
  id: uuidv4(),
  name: 'Test channel',
  type: ChannelType.PUBLIC_CHANNEL,
  rolesAccess: [],
  description: 'This is a test channel',
  createdAt,
  updatedAt,
};

export const newsChannel: PublicChannel = {
  id: uuidv4(),
  name: 'News channel',
  type: ChannelType.NEWS_CHANNEL,
  rolesAccess: [],
  description: 'This is a test channel',
  createdAt,
  updatedAt,
};

export const privateChannel: PublicChannel = {
  id: uuidv4(),
  name: 'Private channel',
  type: ChannelType.PRIVATE_CHANNEL,
  rolesAccess: [UserRole.MARKETING, UserRole.ADMIN],
  description: 'This is a test channel',
  createdAt,
  updatedAt,
};

export const channels = [
  publicChannel,
  privateChannel,
  publicChannel,
  privateChannel,
  newsChannel,
  privateChannel,
  publicChannel,
  privateChannel,
];

export const message1: Message = {
  id: uuidv4(),
  content: 'This is a test message',
  createdAt,
  updatedAt,
  author: users[0],
  attachments: [],
  channel: publicChannel,
};

export const message2: Message = {
  id: uuidv4(),
  content: 'This is a test message',
  createdAt,
  updatedAt,
  author: users[0],
  attachments: [
    {
      id: uuidv4(),
      name: 'test.txt',
    },
  ],
  channel: publicChannel,
};

export const messages = [message1, message2];
