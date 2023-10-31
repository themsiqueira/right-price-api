import { IsOptional, IsString } from 'class-validator';

export class ListPromotionInput {
  @IsOptional()
  @IsString()
  productId?: string

  @IsOptional()
  @IsString()
  productName?: string

  limit: number

  page: number
}
