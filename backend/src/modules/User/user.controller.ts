//// STIJN CHECK THIS!
//import { CurrentUser } from '@decorators';
//import { PaginationQueryInput } from '@lib/interfaces/pagination.interface';
import { PrismaService } from '@modules/Prisma/prisma.service';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }
}
