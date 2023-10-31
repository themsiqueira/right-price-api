import { Injectable } from '@nestjs/common'

import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { ListUserInput } from '@app/user/input/list-user.input'
import { ListUserOutput } from '@app/user/output/list-user.output'

@Injectable()
export class ListUser {
  handle(input: ListUserInput): Promise<ListUserOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
