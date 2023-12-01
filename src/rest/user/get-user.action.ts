import { Body, Controller, HttpCode, HttpStatus, Get } from '@nestjs/common'
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

import { GetUser } from '@app/user/usecases/get-user'
import { GetUserInput } from '@app/user/input/get-user.input'
import { GetUserOutput } from '@app/user/output/get-user.output'

@ApiTags('User')
@Controller('/user')
export class GetUserAction {
  constructor(private handler: GetUser) {}

  @ApiOperation({ operationId: 'GetUser', summary: 'Get User' })
  @ApiBadRequestResponse({
    type: HttpValidationError,
    description: 'Bad request response'
  })
  @ApiConflictResponse({ type: HttpError, description: 'Conflict response' })
  @ApiUnprocessableEntityResponse({ type: HttpError, description: 'Unprocessable entity response' })
  @ApiInternalServerErrorResponse({ type: HttpError, description: 'Internal server error response' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetUserOutput,
    description: 'Success response'
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(@Body() input: GetUserInput): Promise<GetUserOutput> {
    return this.handler.handle(input)
  }
}
