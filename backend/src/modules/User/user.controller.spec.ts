import { Test } from '@nestjs/testing';
import { UserRole, UserStatus } from '@prisma/client';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import type { PaginationQueryInput } from '@lib/interfaces/pagination.interface';
import { CreatePrivateChannelDto } from './dto/create-private-channel.dto';
import { EditUserDto } from './dto/edit-user.dto';
import {
  createdAt,
  currentUser,
  dmChannel,
  dmChannels,
  testUser,
  updatedAt,
  users,
} from '@lib/unit-tests';
import { PublicUser } from '@lib/unit-tests/types';

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
              .mockImplementation(
                (
                  _currentUser: PublicUser,
                  userId: string,
                  userData: EditUserDto,
                ) => {
                  let localAboutMe = _currentUser.aboutMe,
                    localEmail = _currentUser.email,
                    localUsername = _currentUser.username;
                  if (userData.about) localAboutMe = userData.about;
                  if (userData.email) localEmail = userData.email;
                  if (userData.username) localUsername = userData.username;
                  return {
                    id: userId,
                    aboutMe: localAboutMe,
                    email: localEmail,
                    username: localUsername,
                    profilePicture: _currentUser.profilePicture,
                    role: _currentUser.role,
                    status: _currentUser.status,
                    createdAt: _currentUser.createdAt,
                    updatedAt: _currentUser.updatedAt,
                  };
                },
              ),
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

  // // Testing the updateUser method [aboutme]
  // describe('updateUser', () => {
  //   it('should return updated user from current user', async () => {
  //     const userData = new EditUserDto();
  //     userData.about = 'New about me';
  //     expect(
  //       controller.updateUser(currentUser, '@me', userData, null),
  //     ).resolves.toEqual({
  //       ...currentUser,
  //       aboutMe: 'New about me',
  //     });
  //   });
  // });

  // // Testing the updateUser method [email]
  // describe('updateUser', () => {
  //   it('should return updated user from current user', async () => {
  //     const userData = new EditUserDto();
  //     userData.email = 'newtest@test.com';
  //     expect(
  //       controller.updateUser(currentUser, '@me', userData, null),
  //     ).resolves.toEqual({
  //       ...currentUser,
  //       email: 'newtest@test.com',
  //     });
  //   });
  // });

  // // Testing the updateUser method [username]
  // describe('updateUser', () => {
  //   it('should return updated user from current user', async () => {
  //     const userData = new EditUserDto();
  //     userData.username = 'Newme!';
  //     expect(
  //       controller.updateUser(currentUser, '@me', userData, null),
  //     ).resolves.toEqual({
  //       ...currentUser,
  //       aboutMe: 'Newme!',
  //     });
  //   });
  // });
});
