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
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CurrentUser } from 'src/decorators';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
    private userService: UserService,
    @Inject('CRYPTO') private crypto: Argon2CryptoProvider,
  ) {}

  @Post('/token')
  async getJwt(@Body() loginBody: SignInDto): Promise<string> {
    const user = await this.userService.findUserByEmail(loginBody.email);
    const isValid = await this.crypto.verifyPassword(
      user.password,
      loginBody.password,
    );
    if (!user || !isValid) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.authService.signUserJWT(user);
  }

  @Get('/@me')
  @UseGuards(JwtAuthGuard)
  getMe(@CurrentUser() user: User): User {
    return {
      ...user,
      password: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    };
  }
}