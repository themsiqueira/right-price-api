import { IsNotEmpty, IsNumber, IsString, IsDate } from 'class-validator';

export class CreatePromotionInput {
  @IsString()
  @IsNotEmpty()
  emporiumId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsDate()
  @IsNotEmpty()
  expiresAt: Date;
}