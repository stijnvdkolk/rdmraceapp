/* eslint-disable @typescript-eslint/ban-ts-comment */
import { PaginationQueryBuilder } from '@lib/pagination/pagination.queryBuilder';
import { PrismaService } from '@modules/Prisma/prisma.service';
import { ProviderModule } from '@modules/providers/provider.module';
import { Test } from '@nestjs/testing';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { UserService } from './user.service';
// import { v4 as uuidv4 } from 'uuid';
import {
  adminUser,
  createdAt,
  currentUser,
  dmChannel,
  dmChannels,
  testUser,
} from '@lib/unit-tests';
import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '@lib/errors';
import { BadRequestException } from '@nestjs/common';
import { PrismaModule } from '@modules/Prisma/prima.module';

describe('UserService', () => {
  let service: UserService;
  let prismaService: DeepMockProxy<PrismaClient>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [UserService, PaginationQueryBuilder],
      imports: [PaginationQueryBuilder, ProviderModule, PrismaModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaService>())
      .compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get(PrismaService);
    console.log(prismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUserById', () => {
    it('should return a user without sensitive information', async () => {
      const user = testUser;
      // @ts-ignore
      prismaService.user.findUnique.mockResolvedValue(user);

      await expect(service.findUserById(user.id)).resolves.toEqual(user);
    });

    it('should return a user with sensitive information', async () => {
      const user = currentUser;
      prismaService.user.findUnique.mockResolvedValue(user);

      await expect(service.findUserById(user.id, true)).resolves.toEqual(user);
    });

    it('should throw an error when the user doesnt exist', async () => {
      prismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.findUserById(currentUser.id)).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  describe('findUserByEmail', () => {
    it('should return a user', async () => {
      const user = currentUser;
      prismaService.user.findUnique.mockResolvedValue(user);

      await expect(service.findUserByEmail(user.email)).resolves.toEqual(user);
    });

    it('should throw an error when the user doesnt exist', async () => {
      prismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.findUserByEmail(currentUser.email)).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  describe('getUserChannels', () => {
    it('should return a list of channels', async () => {
      // @ts-ignore
      prismaService.user.findFirst.mockResolvedValue({ channels: dmChannels });

      await expect(service.getUserChannels(currentUser)).resolves.toEqual({
        channels: dmChannels,
      });
    });
  });

  describe('createUserChannel', () => {
    it('should throw when you want to create an DM with yourself', async () => {
      await expect(
        service.createUserChannel(currentUser, {
          userId: currentUser.id,
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('should return an already existing channel if it already exists', async () => {
      // @ts-ignore
      prismaService.user.findFirst.mockResolvedValue({ channels: dmChannels });

      // @ts-ignore
      prismaService.channel.create.mockResolvedValue({});

      await expect(
        service.createUserChannel(currentUser, {
          userId: testUser.id,
        }),
      ).resolves.toEqual(dmChannels[0]);
    });

    it('should create a new channel if it doesnt exists', async () => {
      // @ts-ignore
      prismaService.user.findFirst.mockResolvedValue({ channels: dmChannels });

      const _dmChannel = dmChannel;
      _dmChannel._count = {
        messages: 1,
      };
      _dmChannel.messages = [{ createdAt }];

      // @ts-ignore
      prismaService.channel.create.mockResolvedValue(_dmChannel);

      await expect(
        service.createUserChannel(currentUser, {
          userId: adminUser.id,
        }),
      ).resolves.toEqual(_dmChannel);
    });
  });

  describe('findUsersPagination', () => {
    it('should return a list of users', async () => {
      // @ts-ignore
      prismaService.user.findMany.mockResolvedValue([testUser, currentUser]);

      await expect(service.findUsersPagination({})).resolves.toEqual([
        testUser,
        currentUser,
      ]);
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      // @ts-ignore
      prismaService.user.create.mockResolvedValue(testUser);

      await expect(
        service.createUser({
          email: testUser.email,
          password: 'ThisIsATest',
          username: testUser.username,
          role: testUser.role,
        }),
      ).resolves.toEqual(testUser);
    });
  });

  describe('editUser', () => {
    it('should edit a user without password', async () => {
      // @ts-ignore
      prismaService.user.findUnique.mockResolvedValue(testUser);
      // @ts-ignore
      prismaService.user.update.mockResolvedValue(testUser);

      await expect(
        service.editUser(testUser.id, {
          username: testUser.username,
        }),
      ).resolves.toEqual(testUser);
    });

    it('should edit a user with a password', async () => {
      // @ts-ignore
      prismaService.user.findUnique.mockResolvedValue(testUser);
      // @ts-ignore
      prismaService.user.update.mockResolvedValue(testUser);

      await expect(
        service.editUser(testUser.id, {
          password: 'ThisIsATest123!',
        }),
      ).resolves.toEqual(testUser);
    });

    it('should throw an error when the user doesnt exist', async () => {
      prismaService.user.findUnique.mockResolvedValue(null);
      prismaService.user.update.mockRejectedValue(null);

      await expect(
        service.editUser(testUser.id, {
          username: testUser.username,
        }),
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      // @ts-ignore
      prismaService.user.findUnique.mockResolvedValue(testUser);
      // @ts-ignore
      prismaService.user.delete.mockResolvedValue(testUser);

      await expect(service.deleteUser(testUser.id)).resolves.toEqual(testUser);
    });

    it('should throw an error when the user doesnt exist', async () => {
      prismaService.user.findUnique.mockResolvedValue(null);

      await expect(service.deleteUser(testUser.id)).rejects.toThrow(
        NotFoundError,
      );
    });
  });
});
