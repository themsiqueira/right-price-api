import { Injectable } from '@nestjs/common'

import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { ListPromotionOutput } from '@app/product/output/list-promotion.output'
import { ListPromotionInput } from '@app/product/input/list-promotion.input'

@Injectable()
export class ListPromotion {
  handle(input: ListPromotionInput): Promise<ListPromotionOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
