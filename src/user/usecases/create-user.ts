import { Injectable } from '@nestjs/common'

import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { CreateUserInput } from '@app/user/input/create-user.input'
import { CreateUserOutput } from '@app/user/output/create-user.output'

@Injectable()
export class CreateUser {
  handle(input: CreateUserInput): Promise<CreateUserOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
