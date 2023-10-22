import { Injectable } from '@nestjs/common'

import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { UpdateUserInput } from '@app/user/input/update-user.input'
import { UpdateUserOutput } from '@app/user/output/update-user.output'

@Injectable()
export class UpdateUser {
  handle(input: UpdateUserInput): Promise<UpdateUserOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
