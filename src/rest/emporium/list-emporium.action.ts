import { Controller, HttpCode, HttpStatus, Get, Query } from '@nestjs/common'
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
import { ListEmporium } from '@app/emporium/usecases/list-emporium'
import { ListEmporiumInput } from '@app/emporium/input/list-emporium.input'
import { ListEmporiumOutput } from '@app/emporium/output/list-emporium.output'

@ApiTags('Emporium')
@Controller('/emporium')
export class ListEmporiumAction {
  constructor(private handler: ListEmporium) {}

  @ApiOperation({ operationId: 'ListEmporium', summary: 'List Emporium' })
  @ApiBadRequestResponse({
    type: HttpValidationError,
    description: 'Bad request response'
  })
  // TODO: criar custom error para conflict
  @ApiConflictResponse({ type: HttpError, description: 'Conflict response' })
  @ApiUnprocessableEntityResponse({ type: HttpError, description: 'Unprocessable entity response' })
  @ApiInternalServerErrorResponse({ type: HttpError, description: 'Internal server error response' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ListEmporiumInput,
    description: 'Success response'
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(@Query() input: ListEmporiumInput): Promise<ListEmporiumOutput> {
    return this.handler.handle(input)
  }
}
