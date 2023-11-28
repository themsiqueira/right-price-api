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

import { UpdatePromotionInput } from '@app/product/input/update-promotion.input'
import { UpdatePromotionOutput } from '@app/product/output/update-promotion.output'
import { UploadPromotion } from '@app/product/usecases/upload-promotion'
import { HttpError, HttpValidationError } from '@app/rest/swagger/error.model'

@ApiTags('Promotion')
@Controller('/promotion')
export class UploadPromotionAction {
  constructor(private handler: UploadPromotion) {}

  @ApiOperation({ operationId: 'UploadPromotion', summary: 'UploadPromotion' })
  @ApiBadRequestResponse({
    type: HttpValidationError,
    description: 'Bad request response'
  })
  @ApiConflictResponse({ type: HttpError, description: 'Conflict response' })
  @ApiUnprocessableEntityResponse({ type: HttpError, description: 'Unprocessable entity response' })
  @ApiInternalServerErrorResponse({ type: HttpError, description: 'Internal server error response' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UpdatePromotionOutput,
    description: 'Success response'
  })
  @Post('upload')
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() input: UpdatePromotionInput): Promise<UpdatePromotionOutput> {
    return this.handler.handle(input)
  }
}
