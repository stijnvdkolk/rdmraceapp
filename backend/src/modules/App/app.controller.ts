import { Controller, Get, HttpCode } from '@nestjs/common';
import { Public } from '@decorators';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/teapot') // Test http code, add '/' to controler methods for conventional reasons!
  @Public()
  @HttpCode(418)
  getTeapot(): string {
    return 'Do you have some time for tea?';
  }
}
