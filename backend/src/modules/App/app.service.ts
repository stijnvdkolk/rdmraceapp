import { Injectable } from '@nestjs/common';
import { Message, Channel, ChannelType, User, UserRole } from '@prisma/client';
import { PrismaService } from '../Prisma/prisma.service';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
