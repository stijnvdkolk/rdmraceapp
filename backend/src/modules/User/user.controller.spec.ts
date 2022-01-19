import { Test } from '@nestjs/testing';
import { User, UserRole, UserStatus } from '@prisma/client';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import type { PaginationQueryInput } from '@lib/interfaces/pagination.interface';
import { CreatePrivateChannelDto } from './dto/create-private-channel.dto';
import {
  adminUser,
  createdAt,
  currentUser,
  dmChannel,
  dmChannels,
  emptyFile,
  testUser,
  updatedAt,
  users,
} from '@lib/unit-tests';
import { PublicUser } from '@lib/unit-tests/types';
import { v4 as uuidv4 } from 'uuid';
import { ForbiddenException } from '@nestjs/common';

import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { CurrentUser } from '@decorators';
import * as httpMock from 'node-mocks-http';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

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
                  const user = users[1];
                  user.id = _userId;
                  if (!includeSensitiveInformation) user.email = undefined;
                  return user;
                },
              ),
            getUserChannels: jest.fn().mockImplementation(() => {
              return {
                channels: dmChannels,
              };
            }),
            createUserChannel: jest
              .fn()
              .mockImplementation(
                (
                  _currentUser: PublicUser,
                  channelData: CreatePrivateChannelDto,
                ) => {
                  const otherUser = users[1];
                  otherUser.id = channelData.userId;
                  return {
                    ...dmChannel,
                    users: [_currentUser, otherUser],
                  };
                },
              ),
            findUsersPagination: jest
              .fn()
              .mockImplementation((query: PaginationQueryInput) => {
                if (query.limit == 0) return [];
                return new Array<PublicUser>(query.limit).fill(testUser);
              }),
            createUser: jest
              .fn()
              .mockImplementation(
                async ({
                  email,
                  username,
                  role,
                }: {
                  email: string;
                  username: string;
                  role: UserRole;
                }) => {
                  return {
                    id: users[1].id,
                    email,
                    username,
                    role,
                    aboutMe: 'Hey there, I am using PhidippidesChat!',
                    profilePicture: '/embed/avatars/default.png',
                    status: UserStatus.OFFLINE,
                    createdAt,
                    updatedAt,
                  };
                },
              ),
            editUser: jest
              .fn()
              .mockImplementation((userId: string, userData: Partial<User>) => {
                const _currentUser = currentUser;
                let localAboutMe = _currentUser.aboutMe,
                  localEmail = _currentUser.email,
                  localUsername = _currentUser.username,
                  localProfilePicture = _currentUser.profilePicture;
                if (userData.aboutMe) localAboutMe = userData.aboutMe;
                if (userData.email) localEmail = userData.email;
                if (userData.username) localUsername = userData.username;
                if (userData.profilePicture)
                  localProfilePicture = userData.profilePicture;
                return {
                  id: userId,
                  aboutMe: localAboutMe,
                  email: localEmail,
                  username: localUsername,
                  profilePicture: localProfilePicture,
                  role: _currentUser.role,
                  status: _currentUser.status,
                  createdAt: _currentUser.createdAt,
                  updatedAt: _currentUser.updatedAt,
                };
              }),
            uploadProfilePicture: jest.fn().mockImplementation(() => {
              return uuidv4();
            }),
            deleteUser: jest.fn().mockImplementation(() => {
              return currentUser;
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    return;
  });

  describe('@CurrentUser', () => {
    it('should work', () => {
      function getParamDecoratorFactory() {
        class TestDecorator {
          public test(@CurrentUser() _value: unknown) {
            return _value;
          }
        }

        const args = Reflect.getMetadata(
          ROUTE_ARGS_METADATA,
          TestDecorator,
          'test',
        );
        return args[Object.keys(args)[0]].factory;
      }

      /// Usage

      const req = httpMock.createRequest();
      const res = httpMock.createResponse();
      req.user = currentUser;
      const mockDecoratorData = new ExecutionContextHost(
        [req, res],
        UserController,
        controller.getUserById,
      );
      const factory = getParamDecoratorFactory();
      const user = factory(null, mockDecoratorData);
      expect(controller.getUserById(user, '@me')).resolves.toStrictEqual(
        req.user,
      );
    });
  });

  // Testing the getUserById method
  describe('getUserById', () => {
    it('should return an user with the current id', async () => {
      const user = await controller.getUserById(currentUser, '@me');

      expect(user).toEqual(currentUser);
    });
    it('should return an user with a different id', async () => {
      const user = await controller.getUserById(currentUser, testUser.id);
      expect(user).toEqual(testUser);
    });
  });

  // Testing the getUserChannels method
  describe('getUserChannels', () => {
    it('should return all channels with the current user id', async () => {
      const channels = await controller.getUserChannels(currentUser);
      const dmChannelsCopy = dmChannels.map((channel) => {
        return {
          ...channel,
          messages: undefined,
          _count: undefined,
        };
      });
      expect(channels).toEqual({
        channels: dmChannelsCopy,
      });
    });
  });

  // Testing the createUserChannel method
  describe('createUserChannel', () => {
    it('should return newly created DM channel', async () => {
      const channelData = new CreatePrivateChannelDto();
      channelData.userId = users[1].id;
      const createdDMChannel = await controller.createUserChannel(
        currentUser,
        channelData,
      );
      expect(createdDMChannel).toEqual({
        ...dmChannel,
        users: [currentUser, users[1]],
      });
    });
  });

  describe('getUsers', () => {
    it('should return all users', async () => {
      const users = await controller.getUsers({
        limit: 10,
      });
      expect(users).toEqual(new Array(10).fill(testUser));
    });
  });

  describe('createUser', () => {
    it('should return a newly created user', async () => {
      const user = await controller.createUser({
        email: 'test-user@rdmraceapp.nl',
        username: 'test-user',
        role: UserRole.TEAM_MEMBER,
        password: '*ASN9fjkaf9afja9!',
      });
      expect(user).toEqual({
        id: users[1].id,
        email: 'test-user@rdmraceapp.nl',
        username: 'test-user',
        role: UserRole.TEAM_MEMBER,
        aboutMe: 'Hey there, I am using PhidippidesChat!',
        profilePicture: '/embed/avatars/default.png',
        status: UserStatus.OFFLINE,
        createdAt,
        updatedAt,
      });
    });
  });

  describe('updateUser', () => {
    it('should return an updated user with updated aboutMe with input user @me', async () => {
      const user = await controller.updateUser(
        currentUser,
        '@me',
        {
          aboutMe: 'I am a test user',
          email: undefined,
          username: undefined,
          password: undefined,
        },
        null,
      );
      expect(user).toEqual({
        id: currentUser.id,
        email: currentUser.email,
        username: currentUser.username,
        role: currentUser.role,
        aboutMe: 'I am a test user',
        profilePicture: currentUser.profilePicture,
        status: currentUser.status,
        createdAt,
        updatedAt,
      });
    });

    it('should return an updated user with updated profilePictureId with input user @me', async () => {
      const user = await controller.updateUser(
        currentUser,
        '@me',
        {
          aboutMe: undefined,
          email: undefined,
          username: undefined,
          password: undefined,
        },
        emptyFile,
      );
      expect(currentUser.profilePicture).not.toEqual(user.profilePicture);
    });

    it('should return an updated user with updated aboutMe with input user id', async () => {
      const user = await controller.updateUser(
        currentUser,
        currentUser.id,
        {
          aboutMe: 'I am a test user',
          email: undefined,
          username: undefined,
          password: undefined,
        },
        null,
      );
      expect(user).toEqual({
        id: currentUser.id,
        email: currentUser.email,
        username: currentUser.username,
        role: currentUser.role,
        aboutMe: 'I am a test user',
        profilePicture: currentUser.profilePicture,
        status: currentUser.status,
        createdAt,
        updatedAt,
      });
    });

    it('should return an updated user with updated profilePictureId with input user id', async () => {
      const user = await controller.updateUser(
        currentUser,
        currentUser.id,
        {
          aboutMe: undefined,
          email: undefined,
          username: undefined,
          password: undefined,
        },
        emptyFile,
      );
      expect(currentUser.profilePicture).not.toEqual(user.profilePicture);
    });

    it('should return an updated user with updated aboutMe with input user id as admin', async () => {
      const user = await controller.updateUser(
        adminUser,
        currentUser.id,
        {
          aboutMe: 'I am a test user',
          email: undefined,
          username: undefined,
          password: undefined,
        },
        null,
      );
      expect(user).toEqual({
        id: currentUser.id,
        email: currentUser.email,
        username: currentUser.username,
        role: currentUser.role,
        aboutMe: 'I am a test user',
        profilePicture: currentUser.profilePicture,
        status: currentUser.status,
        createdAt,
        updatedAt,
      });
    });

    it('should return an updated user with updated profilePictureId with input user id as admin', async () => {
      const user = await controller.updateUser(
        adminUser,
        currentUser.id,
        {
          aboutMe: undefined,
          email: undefined,
          username: undefined,
          password: undefined,
        },
        emptyFile,
      );
      expect(currentUser.profilePicture).not.toEqual(user.profilePicture);
    });

    it('should return an error when trying to update another user without being admin', async () => {
      expect(
        controller.updateUser(
          currentUser,
          uuidv4(),
          {
            aboutMe: undefined,
            email: undefined,
            username: undefined,
            password: undefined,
          },
          emptyFile,
        ),
      ).rejects.toThrowError(new ForbiddenException('not_allowed'));
    });
  });

  describe('deleteUser', () => {
    it('should return an deleted user', async () => {
      const user = await controller.deleteUser(currentUser.id);
      expect(user).toEqual(currentUser);
    });
  });
});
