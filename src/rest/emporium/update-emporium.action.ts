import { Injectable } from '@nestjs/common'

import { UpdateEmporiumInput } from '@app/emporium/input/update-emporium.input'
import { UpdateEmporiumOutput } from '@app/emporium/output/update-emporium.output'
import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'

@Injectable()
export class UpdateEmporium {
  handle(input: UpdateEmporiumInput): Promise<UpdateEmporiumOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
