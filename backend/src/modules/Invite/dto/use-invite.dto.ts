import { IsStrongPassword } from '@lib/validator/validator';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UseInviteDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
