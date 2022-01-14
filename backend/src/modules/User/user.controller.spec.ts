import { Test } from '@nestjs/testing';
import { UserRole, UserStatus, User } from '@prisma/client';
import { Channel, ChannelType } from '@prisma/client';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { v4 as uuidv4 } from 'uuid';
import type { PaginationQueryInput } from '@lib/interfaces/pagination.interface';

// Date
const date = new Date('2022-01-07T12:27:08.486Z');

// Create a new user
const userId = uuidv4();
const aboutMe = 'I am a user';
const email = 'test@rdmraceapp.nl';
const username = 'Tester';
const profilePicture = '/embed/avatars/default.png';
const role = UserRole.TEAM_MEMBER;
const status = UserStatus.OFFLINE;
const password =
  '$argon2i$v=19$m=16,t=2,p=1$bmV2ZXJnb25uYWdpdmV5b3V1cA$k3KZTkum4B4KeKM6VRsybg';

// Define test user
const currentUser: User = {
  id: uuidv4(),
  aboutMe,
  email,
  username,
  profilePicture,
  role,
  status,
  createdAt: date,
  updatedAt: date,
  password: null,
};

// Create a new channel
const channelId = uuidv4();
const channelName = 'Test channel';
const channelType = ChannelType.DM;

type DMChannel = {
  name: string;
  id: string;
  type: ChannelType;
  users: {
    id: string;
    aboutMe: string;
    profilePicture: string;
    username: string;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
  }[];
};

const channel: DMChannel = {
  id: channelId,
  name: channelName,
  type: channelType,
  users: [
    {
      id: currentUser.id,
      aboutMe,
      profilePicture,
      username,
      role,
      status,
      createdAt: date,
      updatedAt: date,
    },
  ],
};

//
describe('UserController', () => {
  let controller: UserController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findUserById: jest
              .fn()
              .mockImplementation(
                (_userId: string, includeSensitiveInformation = false) => {
                  return {
                    id: _userId,
                    aboutMe,
                    email: includeSensitiveInformation ? email : undefined,
                    username,
                    profilePicture,
                    role,
                    status,
                    createdAt: date,
                    updatedAt: date,
                  };
                },
              ),
            getUserChannels: jest.fn().mockImplementation((_userId: string) => {
              return {
                id: channelId,
                name: channelName,
                type: channelType,
                users: [
                  {
                    id: currentUser.id,
                    aboutMe,
                    profilePicture,
                    username,
                    role,
                    status,
                    createdAt: date,
                    updatedAt: date,
                  },
                ],
              };
            }),
            findUsersPagination: jest
              .fn()
              .mockImplementation((query: PaginationQueryInput) => {
                if (query.limit == 0) return [];
                return new Array(query.limit).fill({
                  id: userId,
                  aboutMe,
                  username,
                  profilePicture,
                  role,
                  status,
                  createdAt: date,
                  updatedAt: date,
                });
              }),
            createUser: undefined,
            editUser: undefined,
            uploadProfilePicture: undefined,
            deleteUser: undefined,
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    return;
  });

  // Testing the getUserById method
  describe('getUserById', () => {
    it('should return an user with the current id', async () => {
      expect(controller.getUserById(currentUser, '@me')).resolves.toEqual(
        currentUser,
      );
    });
    it('should return an user with a different id', async () => {
      const user = {
        id: userId,
        aboutMe,
        email: undefined,
        username,
        profilePicture,
        role,
        status,
        createdAt: date,
        updatedAt: date,
      };
      expect(controller.getUserById(currentUser, userId)).resolves.toEqual(
        user,
      );
    });
  });

  // Testing the getUserChannels method
  describe('getUserChannels', () => {
    it('should return all channels with the current user id', async () => {
      expect(controller.getUserChannels(currentUser)).resolves.toEqual(channel);
    });
  });
});
