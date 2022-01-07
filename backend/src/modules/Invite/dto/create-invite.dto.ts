import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInviteDto {
  @IsString()
  @IsNotEmpty()
  role: string;

  @IsNumber()
  @IsNotEmpty()
  uses: number;

  @IsNumber()
  @IsNotEmpty()
  maxUses: number;

  @IsDate()
  @IsNotEmpty()
  expiresAt: Date;
}
