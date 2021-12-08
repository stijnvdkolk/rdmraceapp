import { NotFoundError } from '@lib/errors';
import { Injectable } from '@nestjs/common';
import { Channel } from '@prisma/client';
import { PrismaService } from '../Prisma/prisma.service';

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  // async findUserById(userId: User['id']): Promise<User> {
  //   try {
  //     return this.prisma.user.findUnique({ where: { id: userId } });
  //   } catch (error) {
  //     throw new NotFoundError('user_not_found');
  //   }
  // }

  async findChannelById(channelId: Channel['id']): Promise<Channel> {
    try {
      return this.prisma.channel.findUnique({ where: { id: channelId } });
    } catch (error) {
      throw new NotFoundError('channel_not_found');
    }
  }

  async findChannelByName(channelName: Channel['name']): Promise<Channel> {
    try {
      return this.prisma.channel.findFirst({ where: { name: channelName } });
    } catch (error) {
      throw new NotFoundError('channel_not_found');
    }
  }

  async FindChannelByUserRole(userId: string): Promise<Channel[]> {
    try {
      return this.prisma.channel.findMany({
        where: { users: { some: { id: userId } } },
      });
    } catch (error) {
      throw new NotFoundError('channel_not_found');
    }
  }
}
