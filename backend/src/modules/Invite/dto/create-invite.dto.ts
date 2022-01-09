import { UserRole } from '@prisma/client';
import { IsDate, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInviteDto {
  @IsEnum(UserRole)
  @IsNotEmpty()
  role: UserRole;

  @IsNumber()
  @IsNotEmpty()
  maxUses: number;

  @IsDate()
  @IsNotEmpty()
  expiresAt: Date;
}
