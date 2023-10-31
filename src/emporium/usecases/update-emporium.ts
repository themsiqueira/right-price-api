import { Injectable } from '@nestjs/common'

import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { UpdateEmporiumInput } from '@app/emporium/input/update-emporium.input'
import { UpdateEmporiumOutput } from '@app/emporium/output/update-emporium.output'

@Injectable()
export class UpdateEmporium {
  handle(input: UpdateEmporiumInput): Promise<UpdateEmporiumOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
