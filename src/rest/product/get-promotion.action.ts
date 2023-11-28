import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse
} from '@nestjs/swagger'

import { GetPromotionInput } from '@app/product/input/get-promotion.input'
import { GetPromotionOutput } from '@app/product/output/get-promotion.output'
import { GetPromotion } from '@app/product/usecases/get-promotion'
import { HttpError, HttpValidationError } from '@app/rest/swagger/error.model'

@ApiTags('Promotion')
@Controller('/promotion')
export class GetPromotionAction {
  constructor(private handler: GetPromotion) {}

  @ApiOperation({ operationId: 'GetPromotion', summary: 'Get Promotion' })
  @ApiBadRequestResponse({
    type: HttpValidationError,
    description: 'Bad request response'
  })
  @ApiConflictResponse({ type: HttpError, description: 'Conflict response' })
  @ApiUnprocessableEntityResponse({ type: HttpError, description: 'Unprocessable entity response' })
  @ApiInternalServerErrorResponse({ type: HttpError, description: 'Internal server error response' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetPromotionOutput,
    description: 'Success response'
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async handle(@Param() input: GetPromotionInput): Promise<GetPromotionOutput> {
    return this.handler.handle(input)
  }
}
