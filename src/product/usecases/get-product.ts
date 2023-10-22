import { Injectable } from '@nestjs/common'

import { GetProductInput } from '@app/product/input/get-product.input'
import { GetProductOutput } from '@app/product/output/get-product.output'
import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'

@Injectable()
export class GetProduct {
  handle(input: GetProductInput): Promise<GetProductOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
