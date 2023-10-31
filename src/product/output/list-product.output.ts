import { GetProductOutput } from '@app/product/output/get-product.output'

export class ListProductOutput {
  total: number
  page: number
  data: Array<GetProductOutput>
}
