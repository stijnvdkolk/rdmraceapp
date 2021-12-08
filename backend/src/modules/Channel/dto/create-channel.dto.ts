import { ChannelType } from '@prisma/client';
import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export class CreateChannelInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ChannelType)
  @IsNotEmpty()
  type: ChannelType;

  @IsString()
  description?: string;
}
