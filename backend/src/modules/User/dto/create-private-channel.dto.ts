import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePrivateChannelDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}
