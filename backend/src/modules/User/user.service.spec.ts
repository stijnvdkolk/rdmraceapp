/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { PaginationQueryBuilder } from '@lib/pagination/pagination.queryBuilder';
import { PrismaService } from '@modules/Prisma/prisma.service';
import { ProviderModule } from '@modules/providers/provider.module';
import { Test } from '@nestjs/testing';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import { UserService } from './user.service';
import { currentUser, testUser } from '@lib/unit-tests';
import { PublicUser } from '@lib/unit-tests/types';
import { PrismaClient } from '@prisma/client';
import { NotFoundError } from '@lib/errors';

describe('UserService', () => {
  let service: UserService;
  let prismaService: DeepMockProxy<PrismaClient>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: mockDeep<PrismaService>(),
        },
        PaginationQueryBuilder,
      ],
      imports: [PaginationQueryBuilder, ProviderModule],
    }).compile();

    service = module.get<UserService>(UserService);
    prismaService = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUserById', () => {
    it('should return a user without sensitive information', async () => {
      const user = testUser;
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
});
