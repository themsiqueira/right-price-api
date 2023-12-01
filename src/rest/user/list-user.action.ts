import { Body, Controller, HttpCode, HttpStatus, Get, Query } from '@nestjs/common'
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

import { ListUser } from '@app/user/usecases/list-user'
import { ListUserInput } from '@app/user/input/list-user.input'
import { ListUserOutput } from '@app/user/output/list-user.output'

@ApiTags('User')
@Controller('/user')
export class ListUserAction {
  constructor(private handler: ListUser) {}

  @ApiOperation({ operationId: 'ListUser', summary: 'List User' })
  @ApiBadRequestResponse({
    type: HttpValidationError,
    description: 'Bad request response'
  })
  @ApiConflictResponse({ type: HttpError, description: 'Conflict response' })
  @ApiUnprocessableEntityResponse({ type: HttpError, description: 'Unprocessable entity response' })
  @ApiInternalServerErrorResponse({ type: HttpError, description: 'Internal server error response' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ListUserInput,
    description: 'Success response'
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(@Query() input: ListUserInput): Promise<ListUserOutput> {
    return this.handler.handle(input)
  }
}
