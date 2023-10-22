import { Injectable } from '@nestjs/common'

import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { UpdateProductInput } from '@app/product/input/update-product.input'
import { UpdateProductOutput } from '@app/product/output/update-product.output'

@Injectable()
export class UpdateProduct {
  handle(input: UpdateProductInput): Promise<UpdateProductOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
