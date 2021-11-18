import { Module } from '@nestjs/common';
import { AuthModule } from '../Auth/auth.module';
import { PrismaModule } from '../Prisma/prima.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
