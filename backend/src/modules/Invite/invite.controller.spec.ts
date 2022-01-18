import { Test } from '@nestjs/testing';
import { InviteController } from './invite.controller';
import { InviteService } from './invite.service';
import type { PaginationQueryInput } from '@lib/interfaces/pagination.interface';
import { UserService } from '@modules/User/user.service';
import { User, UserRole } from '@prisma/client';
import { currentUser, emptyFile, expireAt, invites } from '@lib/unit-tests';
import { NotFoundError } from '@lib/errors';
import { BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

describe('InviteController', () => {
  let controller: InviteController;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [InviteController],
      providers: [
        {
          provide: InviteService,
          useValue: {
            findInvitesPagination: jest
              .fn()
              .mockImplementation((query: PaginationQueryInput) => {
                if (query.limit == 0) return [];
                return invites;
              }),
            getInviteById: jest.fn().mockImplementation((inviteId: string) => {
              const invite = invites.find((invite) => invite.id === inviteId);
              if (!invite) throw new NotFoundError('invite_not_found');

              return invite;
            }),
            createInvite: jest
              .fn()
              .mockImplementation(
                (expiryDate: Date, maxUses: number, role: UserRole) => {
                  const invite = invites[0];
                  invite.expireAt = expiryDate;
                  invite.maxUses = maxUses;
                  invite.role = role;
                  invite.amountUsed = 0;
                  return invite;
                },
              ),
            useInvite: jest.fn().mockImplementation(() => {
              return currentUser;
            }),
            deleteInvite: jest.fn().mockImplementation((inviteId: string) => {
              const invite = invites.find((invite) => invite.id === inviteId);
              if (!invite) throw new NotFoundError('invite_not_found');
              return invite;
            }),
          },
        },
        {
          provide: UserService,
          useValue: {
            uploadProfilePicture: jest.fn().mockImplementation(() => {
              return uuidv4();
            }),
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
          },
        },
      ],
    }).compile();

    controller = module.get<InviteController>(InviteController);
    return;
  });

  describe('getInvites', () => {
    it('should return invites', async () => {
      const result = await controller.getInvites({});
      expect(result).toEqual(invites);
    });
  });

  describe('getInviteById', () => {
    it('should return invite with isValid true when invite can still be used', async () => {
      const result = await controller.getInviteById(invites[0].id);
      expect(result.invite).toEqual(invites[0]);
      expect(result.isValid).toBe(true);
    });

    it('should return invite with isValid false when the invite has been used too much', async () => {
      const result = await controller.getInviteById(invites[1].id);
      expect(result.invite).toEqual(invites[1]);
      expect(result.isValid).toBe(false);
    });

    it('should return invite with isValid false when the invite is expired', async () => {
      const result = await controller.getInviteById(invites[2].id);
      expect(result.invite).toEqual(invites[2]);
      expect(result.isValid).toBe(false);
    });

    it('should throw an error when the invite does not exist', () => {
      expect(controller.getInviteById('invalid-invite-id')).rejects.toThrow(
        NotFoundError,
      );
    });
  });

  describe('createInvite', () => {
    it('should create an invite', async () => {
      const result = await controller.createInvite({
        expiresAt: expireAt.toString(),
        maxUses: invites[0].maxUses,
        role: invites[0].role,
      });
      expect(result).toEqual(invites[0]);
    });
  });

  describe('useInvite', () => {
    it('should return the newly created user without avatar', async () => {
      const result = await controller.useInvite(
        invites[0].id,
        {
          email: currentUser.email,
          username: currentUser.username,
          password: 'password',
        },
        null,
      );
      expect(result.id).toEqual(currentUser.id);
      expect(result.email).toEqual(currentUser.email);
      expect(result.username).toEqual(currentUser.username);
      expect(result.profilePicture).toEqual('/embed/avatars/default.png');
      expect(result.role).toEqual(currentUser.role);
    });

    it('should return the newly created user with avatar', async () => {
      const result = await controller.useInvite(
        invites[0].id,
        {
          email: currentUser.email,
          username: currentUser.username,
          password: 'password',
        },
        emptyFile,
      );
      expect(result.id).toEqual(currentUser.id);
      expect(result.email).toEqual(currentUser.email);
      expect(result.username).toEqual(currentUser.username);
      expect(result.profilePicture).toBeDefined();
      expect(typeof result.profilePicture).toBe('string');
      expect(result.role).toEqual(currentUser.role);
    });

    it('should throw when the invite has been used too much', async () => {
      expect(
        controller.useInvite(
          invites[1].id,
          {
            email: 'test@rdmraceapp.nl',
            username: 'Test',
            password: '8fsad8sdf98A*&A*H',
          },
          null,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw when the invite is expired', async () => {
      expect(
        controller.useInvite(
          invites[2].id,
          {
            email: 'test@rdmraceapp.nl',
            username: 'Test',
            password: '8fsad8sdf98A*&A*H',
          },
          null,
        ),
      ).rejects.toThrow(BadRequestException);
    });

    it('should throw an error when the invite does not exist', () => {
      expect(
        controller.useInvite(
          'invalid-invite-id',
          {
            email: 'test@rdmraceapp.nl',
            username: 'Test',
            password: '8fsad8sdf98A*&A*H',
          },
          null,
        ),
      ).rejects.toThrow(NotFoundError);
    });
  });

  describe('deleteInvite', () => {
    it('should delete an invite', async () => {
      const invite = await controller.deleteInvite(invites[0].id);
      expect(invite).toEqual(invites[0]);
    });

    it('should throw an error when the invite does not exist', () => {
      expect(controller.deleteInvite('invalid-invite-id')).rejects.toThrow(
        NotFoundError,
      );
    });
  });
});
