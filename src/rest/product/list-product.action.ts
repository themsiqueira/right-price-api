import { Body, Controller, HttpCode, HttpStatus, Get, Query } from '@nestjs/common'
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
import { ListProduct } from '@app/product/usecases/list-product'
import { ListProductOutput } from '@app/product/output/list-product.output'
import { ListProductInput } from '@app/product/input/list-product.input'

@ApiTags('Product')
@Controller('/product')
export class ListProductAction{
    constructor(private handler: ListProduct) {}

    @ApiOperation({ operationId: 'ListProduct', summary: 'List Product' })
    @ApiBadRequestResponse({
        type: HttpValidationError,
        description: 'Bad request response'
    })
    @ApiConflictResponse({ type: HttpError, description: 'Conflict response' })
    @ApiUnprocessableEntityResponse({ type: HttpError, description: 'Unprocessable entity response' })
    @ApiInternalServerErrorResponse({ type: HttpError, description: 'Internal server error response' })
    @ApiResponse({
        status: HttpStatus.OK,
        type: ListProduct,
        description: 'Success response'
    })
    @Get()
    @HttpCode(HttpStatus.OK)
    async handle(@Body() input: ListProductInput): Promise<ListProductOutput[]> {
        return this.handler.handle(input)
    }
}