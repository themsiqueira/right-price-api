import { Injectable } from '@nestjs/common'

import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { DeleteEmporiumInput } from '@app/emporium/input/delete-emporium.input'
import { DeleteEmporiumOutput } from '@app/emporium/output/delete-emporium.output'

@Injectable()
export class DeleteEmporium {
  handle(input: DeleteEmporiumInput): Promise<DeleteEmporiumOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
