import { CurrentUser } from '@decorators';
import { Test } from '@nestjs/testing';
import { UserRole, UserStatus } from '@prisma/client';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  // Testing the getUserById method
  describe('getUserById', () => {
    it('should return an user', async () => {
      const user = {
        // !! REQUIRES DATA OF ADMIN USER, PENDING APPROVAL FROM @STIJN !!
        id: '1',
        aboutMe: 'I am an admin on this platform!',
        email: 'admin@rdmraceapp.nl',
        profilePicture: '/embed/avatars/default.png',
        username: 'Admin',
        role: UserRole.ADMIN,
        status: UserStatus.OFFLINE,
        createdAt: new Date('2022-01-07T12:27:08.486Z'),
        updatedAt: new Date('2022-01-07T12:27:08.486Z'),
      };
      jest.spyOn(userService, 'findUserById').mockImplementation(() => user);
      expect(await userController.getUserById(CurrentUser(), '1')).toBe(user); // How to pass first argument to the method?
    });
  });
});
