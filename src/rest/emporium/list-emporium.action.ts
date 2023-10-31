import { Injectable } from '@nestjs/common'

import { ListEmporiumInput } from '@app/emporium/input/list-emporium.input'
import { ListEmporiumOutput } from '@app/emporium/output/list-emporium.output'
import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'

@Injectable()
export class ListEmporium {
  handle(input: ListEmporiumInput): Promise<ListEmporiumOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
