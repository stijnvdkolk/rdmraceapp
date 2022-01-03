import { CurrentUser } from '@decorators';
import { PaginationQueryInput } from '@lib/interfaces/pagination.interface';
import { PrismaService } from '@modules/Prisma/prisma.service';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { User } from '@prisma/client';
import { ChannelService } from './channel.service';

@Controller('/channels')
export class ChannelController {
  constructor(
    private prisma: PrismaService,
    private channelService: ChannelService,
  ) {}

  @Get()
  async getChannels(@Query() query: PaginationQueryInput) {
    return this.channelService.getChannels(query);
  }

  @Get('/:id')
  async getChannel(@Param('id') id: string) {
    return this.channelService.getChannelById(id);
  }

  // TODO: auth check!!!
  @Get('/:id/messages')
  async getChannelMessages(
    @CurrentUser() user: User,
    @Param('id') id: string,
    @Query() query: PaginationQueryInput,
  ) {
    return this.channelService.getMessagesFromChannel(id, query);
  }

  @Get('/:id/messages/:messageId')
  async getChannelMessage(
    @Param('id') channelId: string,
    @Param('messageId') messageId: string,
  ) {
    return this.channelService.getMessageFromChannel(channelId, messageId);
  }
}
