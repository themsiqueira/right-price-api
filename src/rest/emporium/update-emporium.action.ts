import { Body, Controller, HttpStatus, HttpCode, Patch } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse
} from '@nestjs/swagger'

import { UpdateEmporiumInput } from '@app/emporium/input/update-emporium.input'
import { UpdateEmporiumOutput } from '@app/emporium/output/update-emporium.output'
import { UpdateEmporium } from '@app/emporium/usecases/update-emporium'
import { HttpError, HttpValidationError } from '@app/rest/swagger/error.model'

@ApiTags('Emporium')
@Controller('/emporium')
export class UpdateEmporiumAction {
  constructor(private handler: UpdateEmporium) {}

  @ApiOperation({ operationId: 'UpdateEmporium', summary: 'Update Emporium' })
  @ApiBadRequestResponse({
    type: HttpValidationError,
    description: 'Bad request response'
  })
  // TODO: criar custom error para conflict
  @ApiConflictResponse({ type: HttpError, description: 'Conflict response' })
  @ApiUnprocessableEntityResponse({ type: HttpError, description: 'Unprocessable entity response' })
  @ApiInternalServerErrorResponse({ type: HttpError, description: 'Internal server error response' })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    type: UpdateEmporiumInput,
    description: 'Success response'
  })
  @Patch()
  @HttpCode(HttpStatus.ACCEPTED)
  async handle(@Body() input: UpdateEmporiumInput): Promise<UpdateEmporiumOutput> {
    return this.handler.handle(input)
  }
}
