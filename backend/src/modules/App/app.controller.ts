import {
  Controller,
  Get,
  HttpCode,
  UseGuards,
  Request,
  Post,
  Param,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/teapot') // Test http code, add '/' to controler methods for conventional reasons!
  @HttpCode(418)
  getTeapot(): string {
    return 'Do you have some time for tea?';
  }

  // @Get('/user/create')
  // async createUser(): Promise<User> {
  //   return this.appService.createUser();
  // }

  // @Get('/user/:email')
  // async getUser(@Param('email') email: string): Promise<User> {
  //   return this.appService.getUser(email);
  // }
}
