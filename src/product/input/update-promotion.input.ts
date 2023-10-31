import { IsOptional, IsString } from 'class-validator'

export class UpdatePromotionInput {
  @IsOptional()
  @IsString()
  productId?: string

  @IsOptional()
  @IsString()
  expiresAt: Date

  @IsString()
  id: string
}
