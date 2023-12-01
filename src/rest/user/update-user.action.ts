import { Body, Controller, HttpCode, HttpStatus, Patch } from '@nestjs/common'
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

import { UpdateUser } from '@app/user/usecases/update-user'
import { UpdateUserInput } from '@app/user/input/update-user.input'
import { UpdateUserOutput } from '@app/user/output/update-user.output'

@ApiTags('User')
@Controller('/user')
export class UpdateUserAction {
  constructor(private handler: UpdateUser) {}

  @ApiOperation({ operationId: 'UpdateUser', summary: 'Update User' })
  @ApiBadRequestResponse({
    type: HttpValidationError,
    description: 'Bad request response'
  })
  @ApiConflictResponse({ type: HttpError, description: 'Conflict response' })
  @ApiUnprocessableEntityResponse({ type: HttpError, description: 'Unprocessable entity response' })
  @ApiInternalServerErrorResponse({ type: HttpError, description: 'Internal server error response' })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    type: UpdateUserInput,
    description: 'Success response'
  })
  @Patch()
  @HttpCode(HttpStatus.ACCEPTED)
  async handle(@Body() input: UpdateUserInput): Promise<UpdateUserOutput> {
    return this.handler.handle(input)
  }
}
