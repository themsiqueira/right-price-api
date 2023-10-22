import { Injectable } from '@nestjs/common'

import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { LoginInput } from '@app/user/input/login.input'
import { LoginOutput } from '@app/user/output/login.output'

@Injectable()
export class Login {
  handle(input: LoginInput): Promise<LoginOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
