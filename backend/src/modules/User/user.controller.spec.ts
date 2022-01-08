import { Test } from '@nestjs/testing';
import type { UserRole, UserStatus, User } from '@prisma/client';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { v4 as uuidv4 } from 'uuid';
import type { PaginationQueryInput } from '@lib/interfaces/pagination.interface';

// Create a new user
const userId = uuidv4();
const aboutMe = 'I am a user';
const email = 'test@rdmraceapp.nl';
const username = 'Tester';
const profilePicture = '/embed/avatars/default.png';
const role = UserRole.TEAM_MEMBER;
const status = UserStatus.OFFLINE;
const date = new Date('2022-01-07T12:27:08.486Z');
const password =
  '$argon2i$v=19$m=16,t=2,p=1$bmV2ZXJnb25uYWdpdmV5b3V1cA$k3KZTkum4B4KeKM6VRsybg';

// Define user type
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
            findUserByEmail: jest
              .fn()
              .mockImplementation((userEmail: string) => {
                return {
                  id: userId,
                  aboutMe,
                  email: userEmail,
                  username,
                  profilePicture,
                  password,
                  role,
                  status,
                  createdAt: date,
                  updatedAt: date,
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
});
