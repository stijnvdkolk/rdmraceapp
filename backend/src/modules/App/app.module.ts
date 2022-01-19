import { AuthGuard } from '@modules/Auth/guards/auth.guard';
import { ChannelModule } from '@modules/Channel/channel.module';
import { InviteModule } from '@modules/Invite/invite.module';
import { PrismaModule } from '@modules/Prisma/prima.module';
import { ProviderModule } from '@modules/providers/provider.module';
import { UserModule } from '@modules/User/user.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from '../Auth/auth.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    PrismaModule,
    ProviderModule,
    AuthModule,
    UserModule,
    ChannelModule,
    InviteModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
