import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EditUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  about: string;
}
