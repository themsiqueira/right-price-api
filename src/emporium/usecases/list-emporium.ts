import { Injectable } from '@nestjs/common'

import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { ListEmporiumInput } from '@app/emporium/input/list-emporium.input'
import { ListEmporiumOutput } from '@app/emporium/output/list-emporium.output'

@Injectable()
export class ListEmporium {
  handle(input: ListEmporiumInput): Promise<ListEmporiumOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
