import { JwtPayload } from '@lib/interfaces/auth';
import { UserService } from '@modules/User/user.service';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/decorators';
import { AuthService } from '../auth.service';
import { Request } from 'express';
import { UserRole } from '@prisma/client';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const { authorization } = request.headers;

    const rawToken = authorization?.replace('Bearer ', '');

    let token: JwtPayload;
    try {
      token = this.authService.verifyJWT(rawToken);
    } catch (err) {
      // if token is invalid, throw 401
      throw new HttpException('invalid token', 401);
    }

    const user = await this.userService.findUserById(token.sub, true);

    if (!user) {
      throw new HttpException('invalid token', 401);
    }

    request.user = user;

    const allowedRoles = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );

    if (!allowedRoles || allowedRoles.length === 0) {
      return true;
    }

    if (allowedRoles.includes(user.role)) return true;

    return false;
  }
}
