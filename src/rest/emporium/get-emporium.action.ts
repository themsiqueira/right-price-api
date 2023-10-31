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
import { GetEmporium } from '@app/emporium/usecases/get-emporium'
import { GetEmporiumInput } from '@app/emporium/input/get-emporium.input'
import { GetEmporiumOutput } from '@app/emporium/output/get-emporium.output'

@ApiTags('Emporium')
@Controller('/emporium')
export class GetEmporiumAction {
  constructor(private handler: GetEmporium) {}

  @ApiOperation({ operationId: 'GetEmporium', summary: 'Get Emporium' })
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
    type: GetEmporiumInput,
    description: 'Success response'
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(@Body() input: GetEmporiumInput): Promise<GetEmporiumOutput> {
    return this.handler.handle(input)
  }
}
