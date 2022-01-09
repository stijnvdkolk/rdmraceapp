import { PaginationQueryBuilder } from '@lib/pagination/pagination.queryBuilder';
import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';

@Module({
  controllers: [InviteController],
  imports: [],
  providers: [InviteService, PaginationQueryBuilder],
})
export class InviteModule {}
