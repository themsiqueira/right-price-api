import { Injectable } from '@nestjs/common'

import { DeleteEmporiumInput } from '@app/emporium/input/delete-emporium.input'
import { DeleteEmporiumOutput } from '@app/emporium/output/delete-emporium.output'
import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'

@Injectable()
export class DeleteEmporium {
  handle(input: DeleteEmporiumInput): Promise<DeleteEmporiumOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
