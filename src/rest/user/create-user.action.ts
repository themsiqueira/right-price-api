import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
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

import { CreateUser } from '@app/user/usecases/create-user'
import { CreateUserInput } from '@app/user/input/create-user.input'
import { CreateUserOutput } from '@app/user/output/create-user.output'

@ApiTags('User')
@Controller('/user')
export class CreateUserAction {
  constructor(private handler: CreateUser) {}

  @ApiOperation({ operationId: 'CreateUser', summary: 'Create User' })
  @ApiBadRequestResponse({
    type: HttpValidationError,
    description: 'Bad request response'
  })
  @ApiConflictResponse({ type: HttpError, description: 'Conflict response' })
  @ApiUnprocessableEntityResponse({ type: HttpError, description: 'Unprocessable entity response' })
  @ApiInternalServerErrorResponse({ type: HttpError, description: 'Internal server error response' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateUserOutput,
    description: 'Success response'
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() input: CreateUserInput): Promise<CreateUserOutput> {
    return this.handler.handle(input)
  }
}
