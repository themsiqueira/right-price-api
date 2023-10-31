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

import { HttpError, HttpValidationError } from '@app/rest/swagger/error.model'
import { CreateProduct } from '@app/product/usecases/create-product'
import { CreateProductInput } from '@app/product/input/create-product.input'
import { CreateProductOutput } from '@app/product/output/create-product.output'

@ApiTags('Product')
@Controller('/product')
export class CreateProductAction {
    constructor(private handler: CreateProduct) {}

    @ApiOperation({ operationId: 'CreateProduct', summary: 'Create Product' })
    @ApiBadRequestResponse({
      type: HttpValidationError,
      description: 'Bad request response'
    })

    @ApiConflictResponse({ type: HttpError, description: 'Conflict response' })
    @ApiUnprocessableEntityResponse({ type: HttpError, description: 'Unprocessable entity response' })
    @ApiInternalServerErrorResponse({ type: HttpError, description: 'Internal server error response' })
    @ApiResponse({
      status: HttpStatus.CREATED,
      type: CreateProduct,
      description: 'Success response'
    })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async handle (@Body() input: CreateProductInput): Promise<CreateProductOutput> {
        return this.handler.handle(input)
    }
}
