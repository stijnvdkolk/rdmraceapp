import { ChannelType, UserRole, UserStatus } from '@prisma/client';

export type PublicChannel = {
  id: string;
  name: string;
  type: ChannelType;
  rolesAccess?: UserRole[];
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  users?: PublicUser[];
};

export interface DMChannel extends PublicChannel {
  _count?: {
    messages: number;
  };
  messages?: {
    createdAt: Date;
  }[];
  users: PublicUser[];
}

export type PublicUser = {
  id: string;
  aboutMe: string;
  email?: string;
  profilePicture: string;
  username: string;
  role: UserRole;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type Message = {
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
