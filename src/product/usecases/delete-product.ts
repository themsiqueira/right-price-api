import { Injectable } from '@nestjs/common'

import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { DeleteProductOutput } from '@app/product/output/delete-product.output'
import { DeleteProductInput } from '@app/product/input/delete-product.input'

@Injectable()
export class DeleteProduct {
  handle(input: DeleteProductInput): Promise<DeleteProductOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
