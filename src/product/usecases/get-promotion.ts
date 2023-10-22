import { Injectable } from '@nestjs/common'

import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { GetPromotionInput } from '@app/product/input/get-promotion.input'
import { GetPromotionOutput } from '@app/product/output/get-promotion.output'

@Injectable()
export class GetPromotion {
  handle(input: GetPromotionInput): Promise<GetPromotionOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
