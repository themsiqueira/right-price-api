import { Injectable } from '@nestjs/common'

import { UpdatePromotionInput } from '@app/product/input/update-promotion.input'
import { UpdatePromotionOutput } from '@app/product/output/update-promotion.output'
import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'

@Injectable()
export class UpdatePromotion {
  handle(input: UpdatePromotionInput): Promise<UpdatePromotionOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
