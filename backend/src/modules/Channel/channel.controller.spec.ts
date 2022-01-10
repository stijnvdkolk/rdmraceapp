import { Test } from '@nestjs/testing';
import { ChannelType, UserRole, UserStatus } from '@prisma/client';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';
import { v4 as uuidv4 } from 'uuid';

// Create a new channel w/ message and attachment
const channelId = uuidv4();
const name = 'Test channel';
const type = ChannelType.PUBLIC_CHANNEL;
const createdAt = new Date('2022-01-07T12:27:08.486Z');
const updatedAt = new Date('2022-01-07T12:27:08.486Z');

type ChannelMessage = {
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
const messages: ChannelMessage[] = [
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
