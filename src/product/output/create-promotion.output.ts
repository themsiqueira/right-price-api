import { IsNotEmpty, IsString, IsNumber, IsDate } from 'class-validator';

export class CreatePromotionOutput {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsDate()
  @IsNotEmpty()
  expiresAt: Date;
}