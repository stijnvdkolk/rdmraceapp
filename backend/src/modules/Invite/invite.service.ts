/* istanbul ignore file */

import { Inject, Injectable } from '@nestjs/common';
import { Prisma, Invite, UserRole } from '@prisma/client';
import { PrismaService } from '../Prisma/prisma.service';
import { codeGenerator } from '@lib/codegenerator';
import { PaginationQueryInput } from '@lib/interfaces/pagination.interface';
import { PaginationQueryBuilder } from '@lib/pagination/pagination.queryBuilder';
import { UseInviteDto } from './dto/use-invite.dto';
import { Argon2CryptoProvider } from '@modules/providers/argon2.provider';
import { NotFoundError } from '@lib/errors';

@Injectable()
export class InviteService {
  constructor(
    private prisma: PrismaService,
    private queryBuilder: PaginationQueryBuilder<
      Prisma.InviteWhereInput,
      Prisma.InviteOrderByWithRelationInput
    >,
    @Inject('CRYPTO') private crypto: Argon2CryptoProvider,
  ) {}

  async findInvitesPagination(query: PaginationQueryInput): Promise<Invite[]> {
    const {
      pagination: { skip, take },
      where,
      orderBy,
    } = this.queryBuilder.build(query);
    return await this.prisma.invite.findMany({
      skip,
      take,
      orderBy,
      where,
    });
  }

  async getInviteById(id: string): Promise<Invite> {
    const invite = await this.prisma.invite.findUnique({
      where: {
        id: id,
      },
    });
    if (!invite) throw new NotFoundError('invite_not_found');
    return invite;
  }

  async createInvite(
    expiryDate: Date,
    maxUses: number,
    role: UserRole,
  ): Promise<Invite> {
    return await this.prisma.invite.create({
      data: {
        code: codeGenerator(),
        expireAt: expiryDate,
        maxUses: maxUses,
        role: role,
      },
    });
  }

  async useInvite(invite: Invite, data: UseInviteDto) {
    // create user
    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: await this.crypto.hashPassword(data.password),
        username: data.username,
        role: invite.role,
      },
      select: {
        id: true,
        username: true,
        email: true,
        profilePicture: true,
        role: true,
      },
    });

    // update invite
    await this.prisma.invite.update({
      where: {
        id: invite.id,
      },
      data: {
        amountUsed: {
          increment: 1,
        },
      },
    });
    return user;
  }

  async deleteInvite(id: string): Promise<Invite> {
    const invite = await this.prisma.invite.findUnique({
      select: { id: true },
      where: {
        id,
      },
    });
    if (!id) throw new NotFoundError('invite_not_found');
    return await this.prisma.invite.delete({
      where: {
        id: id,
      },
    });
  }
}
