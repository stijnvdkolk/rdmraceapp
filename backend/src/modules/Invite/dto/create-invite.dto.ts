import { UserRole } from '@prisma/client';
import { IsDateString, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInviteDto {
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @IsNumber()
  @IsNotEmpty()
  maxUses: number;

  @IsDateString()
  @IsNotEmpty()
  expiresAt: string;
}
