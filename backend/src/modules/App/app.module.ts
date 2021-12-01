import { AuthGuard } from '@modules/Auth/guards/auth.guard';
import { PrismaModule } from '@modules/Prisma/prima.module';
import { ProviderModule } from '@modules/providers/provider.module';
import { UserModule } from '@modules/User/user.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '../Auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule, ProviderModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
