import { Controller, Get, HttpCode } from '@nestjs/common';
import { Public } from '@decorators';

@Controller('/')
export class AppController {
  @Get('/teapot') // Test http code, add '/' to controler methods for conventional reasons!
  @Public()
  @HttpCode(418)
  getTeapot(): string {
    return 'Do you have some time for tea?';
  }
}
