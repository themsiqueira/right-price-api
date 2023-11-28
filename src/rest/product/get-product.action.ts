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
import { GetProductInput } from '@app/product/input/get-product.input'
import { GetProductOutput } from '@app/product/output/get-product.output'
import { GetProduct } from '@app/product/usecases/get-product'

@ApiTags('Product')
@Controller('/product')
export class GetProductAction {
  constructor(private handler: GetProduct) {}

  @ApiOperation({ operationId: 'GetProduct', summary: 'Get Product' })
  @ApiBadRequestResponse({
    type: HttpValidationError,
    description: 'Bad request response'
  })
  @ApiConflictResponse({ type: HttpError, description: 'Conflict response' })
  @ApiBadRequestResponse({ type: HttpError, description: 'Bad request response' })
  @ApiUnprocessableEntityResponse({ type: HttpError, description: 'Unprocessable entity response' })
  @ApiInternalServerErrorResponse({ type: HttpError, description: 'Internal server error response' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetProductInput,
    description: 'Success response'
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async handle(@Body() input: GetProductInput): Promise<GetProductOutput> {
    return this.handler.handle(input)
  }
}
