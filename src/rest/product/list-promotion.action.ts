import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse
} from '@nestjs/swagger'

import { ListPromotionOutput } from '@app/product/output/list-promotion.output'
import { ListPromotionInput } from '@app/product/input/list-promotion.input'
import { ListPromotion } from '@app/product/usecases/list-promotion'
import { HttpError, HttpValidationError } from '@app/rest/swagger/error.model'

@ApiTags('Promotion')
@Controller('/promotion')
export class ListPromotionAction {
  constructor(private handler: ListPromotion) {}

  @ApiOperation({ operationId: 'ListPromotion', summary: 'List Promotion' })
  @ApiBadRequestResponse({
    type: HttpValidationError,
    description: 'Bad request response'
  })
  @ApiConflictResponse({ type: HttpError, description: 'Conflict response' })
  @ApiUnprocessableEntityResponse({ type: HttpError, description: 'Unprocessable entity response' })
  @ApiInternalServerErrorResponse({ type: HttpError, description: 'Internal server error response' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ListPromotionOutput,
    description: 'Success response'
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(@Query() input: ListPromotionInput): Promise<ListPromotionOutput> {
    return this.handler.handle(input)
  }
}
