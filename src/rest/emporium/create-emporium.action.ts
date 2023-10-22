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
import { CreateEmporium } from '@app/emporium/usecases/create-emporium'
import { CreateEmporiumOutput } from '@app/emporium/output/create-emporium.output'
import { CreateEmporiumInput } from '@app/emporium/input/create-emporium.input'

@ApiTags('Emporium')
@Controller('/emporium')
export class CreateEmporiumAction {
  constructor(private handler: CreateEmporium) {}

  @ApiOperation({ operationId: 'CreateEmporium', summary: 'Create Emporium' })
  @ApiBadRequestResponse({
    type: HttpValidationError,
    description: 'Bad request response'
  })
  // TODO: criar custom error para conflict
  @ApiConflictResponse({ type: HttpError, description: 'Conflict response' })
  @ApiUnprocessableEntityResponse({ type: HttpError, description: 'Unprocessable entity response' })
  @ApiInternalServerErrorResponse({ type: HttpError, description: 'Internal server error response' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreateEmporiumOutput,
    description: 'Success response'
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() input: CreateEmporiumInput): Promise<CreateEmporiumOutput> {
    return this.handler.handle(input)
  }
}
