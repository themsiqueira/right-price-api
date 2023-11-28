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

import { CreatePromotionInput } from '@app/product/input/create-promotion.input'
import { CreatePromotionOutput } from '@app/product/output/create-promotion.output'
import { CreatePromotion } from '@app/product/usecases/create-promotion'
import { HttpError, HttpValidationError } from '@app/rest/swagger/error.model'

@ApiTags('Promotion')
@Controller('/promotion')
export class CreatePromotionAction {
  constructor(private handler: CreatePromotion) {}

  @ApiOperation({ operationId: 'CreatePromotion', summary: 'Create Promotion' })
  @ApiBadRequestResponse({
    type: HttpValidationError,
    description: 'Bad request response'
  })
  @ApiConflictResponse({ type: HttpError, description: 'Conflict response' })
  @ApiUnprocessableEntityResponse({ type: HttpError, description: 'Unprocessable entity response' })
  @ApiInternalServerErrorResponse({ type: HttpError, description: 'Internal server error response' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: CreatePromotionOutput,
    description: 'Success response'
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() input: CreatePromotionInput): Promise<CreatePromotionOutput> {
    return this.handler.handle(input)
  }
}
