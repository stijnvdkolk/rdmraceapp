import { PaginationQueryInput } from '@lib/interfaces/pagination.interface';
import { PaginationQueryBuilder } from '@lib/pagination/pagination.queryBuilder';
import { NotFoundError } from '@lib/errors';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Invite } from '@prisma/client';
import { PrismaService } from '../Prisma/prisma.service';
import { SpacesProvider } from '@modules/providers/spaces.provider';

@Injectable()
export class InviteService {
  constructor(private prisma: PrismaService) {}

  async findCodeById(id: string): Promise<Invite> {
    return await this.prisma.invite.findUnique({
      where: {
        id: id,
      },
    });
  }
}
