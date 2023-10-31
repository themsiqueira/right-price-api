import { Injectable } from '@nestjs/common'

import { GetEmporiumInput } from '@app/emporium/input/get-emporium.input'
import { GetEmporiumOutput } from '@app/emporium/output/get-emporium.output'
import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'

@Injectable()
export class GetEmporium {
  handle(input: GetEmporiumInput): Promise<GetEmporiumOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
