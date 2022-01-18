import { NotFoundError } from '@lib/errors';
import { PaginationQueryInput } from '@lib/interfaces/pagination.interface';
import { PaginationQueryBuilder } from '@lib/pagination/pagination.queryBuilder';
import { PrismaService } from '@modules/Prisma/prisma.service';
import { SpacesProvider } from '@modules/providers/spaces.provider';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  Attachment,
  Channel,
  ChannelType,
  Message,
  Prisma,
  User,
} from '@prisma/client';

@Injectable()
export class ChannelService {
  constructor(
    private prisma: PrismaService,
    private queryBuilder: PaginationQueryBuilder<
      Prisma.ChannelWhereInput,
      Prisma.ChannelOrderByWithRelationInput
    >,
    @Inject('SPACES') private spaces: SpacesProvider,
  ) {}

  async getChannelById(channelId: Channel['id']): Promise<Channel> {
    const channel = this.prisma.channel.findUnique({
      where: { id: channelId },
    });
    if (!channel) throw new NotFoundError('channel_not_found');
    return channel;
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
              name: true,
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
    const message = await this.prisma.message
      .findFirst({
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
              name: true,
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
      })
      .catch(() => {
        throw new NotFoundError('channel_or_message_not_found');
      });
    if (!message) throw new NotFoundError('channel_or_message_not_found');
    return message;
  }

  async createMessage(
    channelId: Channel['id'],
    authorId: User['id'],
    content: string,
    attachments: {
      name: Attachment['name'];
    }[],
  ) {
    try {
      return this.prisma.message.create({
        data: {
          content,
          author: {
            connect: {
              id: authorId,
            },
          },
          channel: {
            connect: {
              id: channelId,
            },
          },
          attachments: {
            createMany: {
              data: attachments,
            },
          },
        },
        include: {
          attachments: true,
          channel: true,
          author: {
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
    } catch (error) {
      throw new NotFoundError('channel_not_found');
    }
  }

  async updateMessage(messageId: string, data: { content: string }) {
    try {
      return this.prisma.message.update({
        where: {
          id: messageId,
        },
        data: {
          content: data.content,
        },
        include: {
          attachments: true,
          channel: true,
          author: {
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
    } catch (error) {
      throw new NotFoundError('channel_or_message_not_found');
    }
  }

  async deleteMessage(messageId: string) {
    try {
      return this.prisma.message.delete({
        where: {
          id: messageId,
        },
      });
    } catch (error) {
      throw new NotFoundError('channel_or_message_not_found');
    }
  }

  async uploadAttachment(
    channelId: Channel['id'],
    messageId: Message['id'],
    file: Express.Multer.File,
  ) {
    try {
      return this.spaces.uploadAttachment(
        {
          id: messageId,
          channelId,
        },
        file,
      );
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async deleteAttachment(
    channelId: Channel['id'],
    messageId: Message['id'],
    attachmentId: Attachment['id'],
    attachmentName: Attachment['name'],
  ) {
    try {
      await this.spaces.deleteAttachment(
        `attachments/${channelId}/${messageId}/${attachmentName}`,
      );
      return this.prisma.attachment.delete({
        where: {
          id: attachmentId,
        },
      });
    } catch (error) {
      throw new NotFoundError('attachment_not_found');
    }
  }
}
