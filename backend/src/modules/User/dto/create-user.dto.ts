import { IsEmail, IsNotEmpty, IsString, IsEnum } from 'class-validator';
import { UserRole } from '@prisma/client';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  // profilePicture???

  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;
}
