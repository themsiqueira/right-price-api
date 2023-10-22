import { Injectable } from '@nestjs/common'

import { ListProductInput } from '@app/product/input/list-product.input'
import { ListProductOutput } from '@app/product/output/list-product.output'
import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'

@Injectable()
export class ListProduct {
  handle(input: ListProductInput): Promise<ListProductOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
