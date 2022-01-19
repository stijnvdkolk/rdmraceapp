import { User, UserRole, UserStatus } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { createdAt, updatedAt } from '.';
import { PublicUser } from './types';

export const currentUser: User = {
  id: uuidv4(),
  aboutMe: 'I am a user',
  email: 'unit-test@rdmraceapp.nl',
  username: 'Tester',
  profilePicture: '/embed/avatars/default.png',
  role: UserRole.TEAM_MEMBER,
  status: UserStatus.OFFLINE,
  createdAt,
  updatedAt,
  password: null,
};

export const adminUser: User = {
  id: uuidv4(),
  aboutMe: 'I am an admin',
  email: 'admin@rdmraceapp.nl',
  username: 'Admin',
  profilePicture: '/embed/avatars/default.png',
  role: UserRole.ADMIN,
  status: UserStatus.OFFLINE,
  createdAt,
  updatedAt,
  password: null,
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

export const emptyFile: Express.Multer.File = {
  originalname: null,
  mimetype: null,
  fieldname: null,
  buffer: null,
  encoding: null,
  size: null,
  destination: null,
  filename: null,
  path: null,
  stream: null,
};
