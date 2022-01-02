import { PaginationQueryBuilder } from '@lib/pagination/pagination.queryBuilder';
import { Module } from '@nestjs/common';
import { ChannelController } from './channel.controller';
import { ChannelService } from './channel.service';

@Module({
  imports: [],
  controllers: [ChannelController],
  providers: [ChannelService, PaginationQueryBuilder],
  exports: [ChannelService],
})
export class ChannelModule {}
