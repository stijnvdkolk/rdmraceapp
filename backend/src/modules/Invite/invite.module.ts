import { PaginationQueryBuilder } from '@lib/pagination/pagination.queryBuilder';
import { Module } from '@nestjs/common';
import { InviteService } from './invite.service';
import { InviteController } from './invite.controller';
import { UserModule } from '@modules/User/user.module';

@Module({
  controllers: [InviteController],
  imports: [UserModule],
  providers: [InviteService, PaginationQueryBuilder],
})
export class InviteModule {}
