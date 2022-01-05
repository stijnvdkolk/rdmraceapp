import { PaginationQueryBuilder } from '@lib/pagination/pagination.queryBuilder';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [UserService, PaginationQueryBuilder],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
