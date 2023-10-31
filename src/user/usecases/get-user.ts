import { Injectable } from '@nestjs/common'

import { GetUserInput } from '@app/user/input/get-user.input'
import { GetUserOutput } from '@app/user/output/get-user.output'
import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'

@Injectable()
export class GetUser {
  handle(input: GetUserInput): Promise<GetUserOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
