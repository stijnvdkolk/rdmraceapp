import { ChannelType, UserRole } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { createdAt, updatedAt } from '.';
import { PublicChannel, Message } from './types';
import { users } from './user';

export const dmChannel: PublicChannel = {
  id: uuidv4(),
  name: '',
  type: ChannelType.DM,
  users,
  createdAt,
  updatedAt,
};

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
  rolesAccess: [UserRole.TEAM_MEMBER, UserRole.MARKETING, UserRole.ADMIN],
  description: 'This is a test channel',
  createdAt,
  updatedAt,
};

export const dmChannels = [dmChannel];
export const channels = [publicChannel, newsChannel, privateChannel];

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
