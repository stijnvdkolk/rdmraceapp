import { PaginationQueryInput } from '@lib/interfaces/pagination.interface';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  async getUserById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Get('/')
  async getUsers(@Query() query: PaginationQueryInput) {
    return this.userService.findUsersPagination(query);
  }
}
