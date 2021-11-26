import { PrismaModule } from '@modules/Prisma/prima.module';
import { ProviderModule } from '@modules/providers/provider.module';
import { Module } from '@nestjs/common';
import { AuthModule } from '../Auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule, ProviderModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
