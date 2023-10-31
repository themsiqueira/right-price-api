import { GetProductOutput } from '@app/product/output/get-product.output'

export class GetPromotionOutput {
  id: string
  product: GetProductOutput
  price: number
  validityDate: Date
}
