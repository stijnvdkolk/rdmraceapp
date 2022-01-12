import { PrismaService } from '@modules/Prisma/prisma.service';
import { Argon2CryptoProvider } from '@modules/providers/argon2.provider';
import { UserService } from '@modules/User/user.service';
import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser, Public } from '@decorators';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    @Inject('CRYPTO') private crypto: Argon2CryptoProvider,
  ) {}

  @Post('/token')
  @Public()
  async getJwt(@Body() loginBody: SignInDto): Promise<{
    token: string;
  }> {
    const user = await this.userService.findUserByEmail(loginBody.email);
    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const isValid = await this.crypto.verifyPassword(
      user.password,
      loginBody.password,
    );
    if (!isValid) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return {
      token: this.authService.signUserJWT(user),
    };
  }
}
