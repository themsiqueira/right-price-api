import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';

export class UpdatePromotionInput {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsDate()
  @IsNotEmpty()
  expiresAt: Date;
}
