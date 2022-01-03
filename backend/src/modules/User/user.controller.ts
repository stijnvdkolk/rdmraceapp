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
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';

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

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    return this.userService.createUser(userData);
  }

  @Put('/:userId')
  async updateUser(@Param('userId') id: string, @Body() userData: EditUserDto) {
    return this.userService.editUser(id, userData);
  }

  @Delete('/:userId')
  async deleteUser(@Param('userId') id: string) {
    return this.userService.deleteUser(id);
  }
}
