import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../User/user.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 18000 },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
