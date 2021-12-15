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

  // Returns the DM channel of specific user, given an user ID
  async getDirectMessageChannelsOfUser(userId: User['id']) {
    return this.prisma.channel.findMany({
      where: {
        users: {
          some: {
            id: userId,
          },
        },
        type: ChannelType.DM,
      },
      select: {
        id: true,
        messages: false,
        name: true,
        type: true,
        createdAt: true,
        description: false,
        rolesAccess: false,
        updatedAt: false,
        users: {
          select: {
            aboutMe: true,
            profilePicture: true,
            status: true,
            username: true,
            role: true,
            id: true,
            email: false,
            channels: false,
            createdAt: true,
            updatedAt: true,
            messages: false,
            password: false,
          },
        },
      },
    });
  }

  // Returns all the channels, given the correct QueryInput
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

  // Creates a new DM channel between two users
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

  // Returns all the messages from a channel, given the channel ID and optional QueryInput
  async getMessagesFromChannel(
    channelId: Channel['id'],
    query: PaginationQueryInput,
  ) {
    try {
      const {
        pagination: { skip, take },
        where,
        orderBy,
      } = this.queryBuilder.build(query);
      return this.prisma.message.findMany({
        skip,
        take,
        orderBy,
        where: {
          ...where,
          channel: {
            id: channelId,
          },
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          author: {
            select: {
              id: true,
              username: true,
              profilePicture: true,
              status: true,
              aboutMe: true,
              role: true,
              channels: false,
              messages: false,
              createdAt: true,
              updatedAt: false,
              email: false,
              password: false,
            },
          },
          attachments: {
            select: {
              id: true,
              url: true,
            },
          },
          channel: {
            select: {
              id: true,
              name: true,
              type: true,
              createdAt: true,
              description: false,
              rolesAccess: false,
              updatedAt: false,
              users: false,
            },
          },
        },
      });
    } catch (error) {
      throw new NotFoundError('channel_not_found');
    }
  }

  // Creates a new message in a channel, given the channel ID and the message content
  async getMessageFromChannel(
    channelId: Channel['id'],
    messageId: Message['id'],
  ) {
    try {
      return this.prisma.message.findFirst({
        where: {
          channel: {
            id: channelId,
          },
          id: messageId,
        },
        select: {
          id: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          author: {
            select: {
              id: true,
              username: true,
              profilePicture: true,
              status: true,
              aboutMe: true,
              role: true,
              channels: false,
              messages: false,
              createdAt: true,
              updatedAt: false,
              email: false,
              password: false,
            },
          },
          attachments: {
            select: {
              id: true,
              url: true,
            },
          },
          channel: {
            select: {
              id: true,
              name: true,
              type: true,
              createdAt: true,
              description: false,
              rolesAccess: false,
              updatedAt: false,
              users: false,
            },
          },
        },
      });
    } catch (error) {
      throw new NotFoundError('channel_not_found');
    }
  }
}
