import { Injectable } from '@nestjs/common'
import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { DeleteUserInput } from '@app/user/input/delete-user.input'
import { DeleteUserOutput } from '@app/user/output/delete-user.output'

@Injectable()
export class DeleteUser {
  handle(input: DeleteUserInput): Promise<DeleteUserOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
