import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserRole, UserStatus } from '@prisma/client';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (
    _data: unknown,
    context: ExecutionContext,
  ): {
    id: string;
    aboutMe: string;
    email: string;
    profilePicture: string;
    username: string;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
  } => {
    const request = context.switchToHttp().getRequest<Request>();

    return request.user;
  },
);
