import { UserRole, UserStatus } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { createdAt, updatedAt } from '.';
import { PublicUser } from './types';

export const currentUser: PublicUser = {
  id: uuidv4(),
  aboutMe: 'I am a user',
  email: 'unit-test@rdmraceapp.nl',
  username: 'Tester',
  profilePicture: '/embed/avatars/default.png',
  role: UserRole.TEAM_MEMBER,
  status: UserStatus.OFFLINE,
  createdAt,
  updatedAt,
};

export const testUser: PublicUser = {
  id: uuidv4(),
  aboutMe: 'I am a user',
  username: 'Tester2',
  profilePicture: '/embed/avatars/default.png',
  role: UserRole.TEAM_MEMBER,
  status: UserStatus.OFFLINE,
  createdAt,
  updatedAt,
};

export const users = [currentUser, testUser];
