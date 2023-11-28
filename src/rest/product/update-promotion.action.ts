import { Body, Controller, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse
} from '@nestjs/swagger'

import { UpdatePromotion } from '@app/product/usecases/update-promotion'
import { HttpError, HttpValidationError } from '@app/rest/swagger/error.model'
import { UpdatePromotionOutput } from '@app/product/output/update-promotion.output'
import { UpdatePromotionInput } from '@app/product/input/update-promotion.input'

@ApiTags('Promotion')
@Controller('/promotion')
export class UpdatePromotionAction {
  constructor(private handler: UpdatePromotion) {}

  @ApiOperation({ operationId: 'UpdatePromotion', summary: 'Update Promotion' })
  @ApiBadRequestResponse({
    type: HttpValidationError,
    description: 'Bad request response'
  })
  @ApiConflictResponse({ type: HttpError, description: 'Conflict response' })
  @ApiUnprocessableEntityResponse({ type: HttpError, description: 'Unprocessable entity response' })
  @ApiInternalServerErrorResponse({ type: HttpError, description: 'Internal server error response' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UpdatePromotionOutput,
    description: 'Success response'
  })
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async handle(@Param() paramInput: { id: string }, @Body() input: Partial<UpdatePromotionInput>): Promise<UpdatePromotionOutput> {
    return this.handler.handle(<UpdatePromotionInput>{ ...input, ...paramInput })
  }
}
