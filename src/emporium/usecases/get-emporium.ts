import { Injectable } from '@nestjs/common'

import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { GetEmporiumInput } from '@app/emporium/input/get-emporium.input'
import { GetEmporiumOutput } from '@app/emporium/output/get-emporium.output'

@Injectable()
export class GetEmporium {
  handle(input: GetEmporiumInput): Promise<GetEmporiumOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
