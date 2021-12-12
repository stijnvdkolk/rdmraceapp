import { NotFoundError } from '@lib/errors';
import { PaginationQueryInput } from '@lib/interfaces/pagination.interface';
import { PaginationQueryBuilder } from '@lib/pagination/pagination.queryBuilder';
import { Injectable } from '@nestjs/common';
import { Channel, ChannelType, Message, Prisma, User } from '@prisma/client';
import { PrismaService } from '../Prisma/prisma.service';

@Injectable()
export class ChannelService {
  constructor(
    private prisma: PrismaService,
    private queryBuilder: PaginationQueryBuilder<
      Prisma.ChannelWhereInput,
      Prisma.ChannelOrderByWithRelationInput
    >,
  ) {}

  async getChannelById(channelId: Channel['id']): Promise<Channel> {
    try {
      return this.prisma.channel.findUnique({ where: { id: channelId } });
    } catch (error) {
      throw new NotFoundError('channel_not_found');
    }
  }

  async getDirectMessageChannelsOfUser(userId: User['id']): Promise<Channel[]> {
    return this.prisma.channel.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
        type: ChannelType.DM,
      },
    });
  }

  async getChannels(query: PaginationQueryInput) {
    try {
      const {
        pagination: { skip, take },
        where,
        orderBy,
      } = this.queryBuilder.build(query);
      return this.prisma.channel.findMany({
        skip,
        take,
        orderBy,
        where: {
          ...where,
          type: {
            in: [
              ChannelType.NEWS_CHANNEL,
              ChannelType.PUBLIC_CHANNEL,
              ChannelType.PRIVATE_CHANNEL,
            ],
          },
        },
        select: {
          id: true,
          messages: false,
          name: true,
          type: true,
          createdAt: true,
          description: true,
          rolesAccess: true,
          updatedAt: false,
          users: false,
        },
      });
    } catch (error) {
      throw new NotFoundError('channels_not_found');
    }
  }

  async createDMChannel(creator: User, otherUser: User): Promise<Channel> {
    const channel = await this.prisma.channel.create({
      data: {
        name: 'DM Channel',
        users: {
          connect: [
            {
              id: creator.id,
            },
            {
              id: otherUser.id,
            },
          ],
        },
        type: ChannelType.DM,
      },
    });
    return channel;
  }
}
