import { NotFoundError } from '@lib/errors';
import { Injectable } from '@nestjs/common';
import { Channel, ChannelType, User, UserRole } from '@prisma/client';
import { PrismaService } from '../Prisma/prisma.service';

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  async findChannelById(channelId: Channel['id']): Promise<Channel> {
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

  async getChannels(): Promise<Channel[]> {
    try {
      return this.prisma.channel.findMany({
        where: {
          type: {
            in: [
              ChannelType.NEWS_CHANNEL,
              ChannelType.PUBLIC_CHANNEL,
              ChannelType.PRIVATE_CHANNEL,
            ],
          },
        },
      });
    } catch (error) {
      throw new NotFoundError('channel_not_found');
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
