import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const admin = this.reflector.get<boolean>('isAdmin', context.getHandler());
    if (!admin) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();
    const { user } = request;

    // TODO: fix this
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return user.admin;
  }
}
