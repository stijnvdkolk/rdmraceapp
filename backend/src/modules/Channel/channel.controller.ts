import { CurrentUser } from '@decorators';
import { PaginationQueryInput } from '@lib/interfaces/pagination.interface';
import { PrismaService } from '@modules/Prisma/prisma.service';
import { SpacesProvider } from '@modules/providers/spaces.provider';
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { User, UserRole } from '@prisma/client';
import { ChannelService } from './channel.service';

@Controller('/channels')
export class ChannelController {
  constructor(
    private prisma: PrismaService,
    private channelService: ChannelService,
    @Inject('SPACES') private spaces: SpacesProvider,
  ) {}

  @Get()
  async getChannels(
    @CurrentUser() user: User,
    @Query() query: PaginationQueryInput,
  ) {
    const channels = await this.channelService.getChannels(query);
    return channels
      .filter((channel) => {
        if (channel.rolesAccess.length === 0) return true;
        return channel.rolesAccess.includes(user.role);
      })
      .sort((a, b) => {
        if (a.type === b.type) return 0;
        if (a.type === 'NEWS_CHANNEL') return -1;
        if (b.type === 'PRIVATE_CHANNEL') return 1;
        return 0;
      });
  }

  @Get('/:id')
  async getChannel(@Param('id') id: string) {
    return this.channelService.getChannelById(id);
  }

  @Get('/:id/messages')
  async getChannelMessages(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Query() query: PaginationQueryInput,
  ) {
    const channel = await this.channelService.getChannelById(id);
    if (
      channel.rolesAccess.length > 0 &&
      !channel.rolesAccess.includes(user.role)
    )
      throw new ForbiddenException('not_allowed');
    return this.channelService.getMessagesFromChannel(id, query);
  }

  @Get('/:id/messages/:messageId')
  async getChannelMessage(
    @CurrentUser() user: User,
    @Param('id') channelId: string,
    @Param('messageId') messageId: string,
  ) {
    const channel = await this.channelService.getChannelById(channelId);
    if (
      channel.rolesAccess.length > 0 &&
      !channel.rolesAccess.includes(user.role)
    )
      throw new ForbiddenException('not_allowed');
    return this.channelService.getMessageFromChannel(channelId, messageId);
  }

  @Post('/:id/messages')
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: {
        fileSize: 10000000,
      },
    }),
  )
  async createChannelMessage(
    @Param('id') channelId: string,
    @CurrentUser() user: User,
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() data: { content?: string },
  ) {
    const channel = await this.channelService.getChannelById(channelId);
    if (
      channel.rolesAccess.length > 0 &&
      !channel.rolesAccess.includes(user.role)
    )
      throw new ForbiddenException('not_allowed');
    files = files.map((file) => ({
      ...file,
      filename: file.originalname
        .replace(/[\/\?<>\\:\*\|"]/g, '_')
        .replace(/[\x00-\x1f\x80-\x9f]/g, '_')
        .replace(/^\.+$/, '_')
        .replace(/[\. ]+$/, '_')
        .replace(' ', '_'),
    }));
    const message = await this.channelService.createMessage(
      channelId,
      user.id,
      data.content,
      files.map((file) => ({ name: file.filename })),
    );
    for await (const file of files) {
      await this.spaces.uploadAttachment(
        {
          id: message.id,
          channelId,
        },
        file,
      );
    }
    return message;
  }

  @Patch('/:id/messages/:messageId')
  async updateChannelMessage(
    @Param('id') channelId: string,
    @Param('messageId') messageId: string,
    @CurrentUser() user: User,
    @Body() data: { content: string },
  ) {
    const channel = await this.channelService.getChannelById(channelId);
    if (
      channel.rolesAccess.length > 0 &&
      !channel.rolesAccess.includes(user.role)
    )
      throw new ForbiddenException('not_allowed');
    const message = await this.channelService.getMessageFromChannel(
      channelId,
      messageId,
    );
    if (message.author.id !== user.id) {
      throw new ForbiddenException('not_allowed');
    }
    return this.channelService.updateMessage(messageId, data);
  }

  @Delete('/:id/messages/:messageId')
  async deleteChannelMessage(
    @Param('id') channelId: string,
    @Param('messageId') messageId: string,
    @CurrentUser() user: User,
  ) {
    const channel = await this.channelService.getChannelById(channelId);
    if (
      channel.rolesAccess.length > 0 &&
      !channel.rolesAccess.includes(user.role)
    )
      throw new ForbiddenException('not_allowed');
    const message = await this.channelService.getMessageFromChannel(
      channelId,
      messageId,
    );
    if (message.author.id === user.id || user.role == UserRole.ADMIN) {
      for await (const attachment of message.attachments) {
        await this.spaces.deleteAttachment(
          `attachments/${channelId}/${messageId}/${attachment.name}`,
        );
        await this.prisma.attachment.delete({
          where: {
            id: attachment.id,
          },
        });
      }
      return this.channelService.deleteMessage(messageId);
    }
    throw new ForbiddenException('not_allowed');
  }
}
