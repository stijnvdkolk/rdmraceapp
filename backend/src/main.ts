import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/App/app.module';
import { UserRole, UserStatus } from '@prisma/client';

declare module 'express' {
  interface Request {
    user: {
      id: string;
      aboutMe: string;
      email: string;
      profilePicture: string;
      username: string;
      role: UserRole;
      status: UserStatus;
      createdAt: Date;
      updatedAt: Date;
    };
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
