import { Injectable } from '@nestjs/common'

import { CreateProductInput } from '@app/product/input/create-product.input'
import { CreateProductOutput } from '@app/product/output/create-product.output'
import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'

@Injectable()
export class CreateProduct {
  handle(input: CreateProductInput): Promise<CreateProductOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
