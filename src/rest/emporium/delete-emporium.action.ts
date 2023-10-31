import { Body, Controller, HttpCode, HttpStatus, Post, Delete } from '@nestjs/common'
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
import { DeleteEmporium } from '@app/emporium/usecases/delete-emporium'
import { DeleteEmporiumInput } from '@app/emporium/input/delete-emporium.input'

@ApiTags('Emporium')
@Controller('/emporium')
export class DeleteEmporiumAction {
  constructor(private handler: DeleteEmporium) {}

  @ApiOperation({ operationId: 'DeleteEmporium', summary: 'Delete Emporium' })
  @ApiBadRequestResponse({
    type: HttpValidationError,
    description: 'Bad request response'
  })
  // TODO: criar custom error para conflict
  @ApiConflictResponse({ type: HttpError, description: 'Conflict response' })
  @ApiUnprocessableEntityResponse({ type: HttpError, description: 'Unprocessable entity response' })
  @ApiInternalServerErrorResponse({ type: HttpError, description: 'Internal server error response' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    type: DeleteEmporiumInput,
    description: 'Success response'
  })
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async handle(@Body() input: DeleteEmporiumInput): Promise<void> {
    return this.handler.handle(input)
  }
}
