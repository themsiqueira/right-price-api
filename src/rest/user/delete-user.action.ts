import { Body, Controller, HttpCode, HttpStatus, Delete } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse
} from '@nestjs/swagger'

import { HttpError, HttpValidationError } from '@app/rest/swagger/error.model'
import { DeleteUser } from '@app/user/usecases/delete-user'
import { DeleteUserInput } from '@app/user/input/delete-user.input'

@ApiTags('User')
@Controller('/user')
export class DeleteUserAction {
  constructor(private handler: DeleteUser) {}

  @ApiOperation({ operationId: 'DeleteUser', summary: 'Delete User' })
  @ApiBadRequestResponse({
    type: HttpValidationError,
    description: 'Bad request response'
  })
  @ApiConflictResponse({ type: HttpError, description: 'Conflict response' })
  @ApiUnprocessableEntityResponse({ type: HttpError, description: 'Unprocessable entity response' })
  @ApiInternalServerErrorResponse({ type: HttpError, description: 'Internal server error response' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    type: DeleteUserInput,
    description: 'Success response'
  })
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Body() input: DeleteUserInput): Promise<void> {
    return this.handler.handle(input)
  }
}
