import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreatePromotionInput {
  @IsNotEmpty()
  @IsString()
  productId: string

  @IsNotEmpty()
  @IsString()
  price: number

  // TODO: add class transform to create date instance
  @IsNotEmpty()
  @IsDateString()
  validityDate: string
}
