import { PaginationQueryInput } from '@lib/interfaces/pagination.interface';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
  Query,
  ForbiddenException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { CurrentUser, Roles } from '@decorators';
import { User, UserRole } from '@prisma/client';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:id')
  async getUserById(@CurrentUser() user: User, @Param('id') id: string) {
    if (id === '@me') return user;
    return this.userService.findUserById(id, false);
  }

  @Get('/')
  async getUsers(@Query() query: PaginationQueryInput) {
    return this.userService.findUsersPagination(query);
  }

  @Post()
  @Roles([UserRole.ADMIN])
  async createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @Put('/:userId')
  async updateUser(
    @CurrentUser() user: User,
    @Param('userId') id: string,
    @Body() userData: EditUserDto,
  ) {
    if (id === '@me') {
      return this.userService.editUser(user.id, userData);
    }
    if (user.role == UserRole.ADMIN) {
      return this.userService.editUser(id, userData);
    }
    throw new ForbiddenException('not_allowed');
  }

  @Delete('/:userId')
  @Roles([UserRole.ADMIN])
  async deleteUser(@Param('userId') id: string) {
    return this.userService.deleteUser(id);
  }
}
