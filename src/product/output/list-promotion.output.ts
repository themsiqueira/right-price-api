import { GetPromotionOutput } from '@app/product/output/get-promotion.output'

export class ListPromotionOutput {
  total: number
  page: number
  data: Array<GetPromotionOutput>
}
