import { Body, Controller, HttpStatus, HttpCode, Post } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnprocessableEntityResponse
} from '@nestjs/swagger'

import { UpdateProductOutput } from '@app/product/output/update-product.output'
import { UpdateProductInput } from '@app/product/input/update-product.input'
import { UpdateProduct } from '@app/product/usecases/update-product'
import { HttpError, HttpValidationError } from '@app/rest/swagger/error.model'

@ApiTags('Product')
@Controller('/product')
export class UpdateProductAction {
  constructor(private handler: UpdateProduct) {}
  @ApiOperation({ operationId: 'UpdateProduct', summary: 'Update Product' })
  @ApiBadRequestResponse({
    type: HttpValidationError,
    description: 'Bad request response'
  })
  @ApiConflictResponse({ type: HttpError, description: 'Conflict response' })
  @ApiUnprocessableEntityResponse({ type: HttpError, description: 'Unprocessable entity response' })
  @ApiInternalServerErrorResponse({ type: HttpError, description: 'Internal server error response' })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    type: UpdateProductInput,
    description: 'Success response'
  })
  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async handle(@Body() input: UpdateProductInput): Promise<UpdateProductOutput> {
    return this.handler.handle(input)
  }
}
