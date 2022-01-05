import { IsStrongPassword } from '@lib/validator/validator';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  username: string;

  @IsString()
  @IsOptional()
  about: string;

  @IsString()
  @IsStrongPassword()
  @IsOptional()
  password: string;
}
