import { Injectable } from '@nestjs/common'

import { CreatePromotionInput } from '@app/product/input/create-promotion.input'
import { CreatePromotionOutput } from '@app/product/output/create-promotion.output'
import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'

@Injectable()
export class CreatePromotion {
  handle(input: CreatePromotionInput): Promise<CreatePromotionOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
