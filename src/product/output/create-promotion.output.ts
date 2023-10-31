import { IsString } from 'class-validator'

export class CreatePromotionOutput {
  @IsString()
  productId: string

  id: string

  validityDate: string
}
