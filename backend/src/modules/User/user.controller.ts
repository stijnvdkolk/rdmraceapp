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
  UseInterceptors,
  UploadedFile,
  Patch,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { CurrentUser, Roles } from '@decorators';
import { User, UserRole } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Patch('/:userId')
  @UseInterceptors(
    FileInterceptor('profilepicture', {
      limits: {
        fileSize: 10000000,
      },
      fileFilter: (req, file, callback) => {
        if (file.mimetype.includes('image')) {
          callback(null, true);
        } else {
          callback(new UnsupportedMediaTypeException(), false);
        }
      },
    }),
  )
  async updateUser(
    @CurrentUser() currentUser: User,
    @Param('userId') id: string,
    @Body() userData: EditUserDto,
    @UploadedFile() profilepicture: Express.Multer.File,
  ) {
    const user: Partial<User> = userData;
    if (id === '@me') {
      if (profilepicture) {
        user.profilePicture = await this.userService.uploadProfilePicture(
          currentUser.id,
          profilepicture,
        );
      }
      return this.userService.editUser(currentUser.id, user);
    }
    if (currentUser.role == UserRole.ADMIN) {
      if (profilepicture) {
        user.profilePicture = await this.userService.uploadProfilePicture(
          id,
          profilepicture,
        );
      }
      return this.userService.editUser(id, user);
    }
    throw new ForbiddenException('not_allowed');
  }

  @Delete('/:userId')
  @Roles([UserRole.ADMIN])
  async deleteUser(@Param('userId') id: string) {
    return this.userService.deleteUser(id);
  }
}
