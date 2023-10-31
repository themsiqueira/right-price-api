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
import { DeleteProductInput } from '@app/product/input/delete-product.input'
import { DeleteProduct } from '@app/product/usecases/delete-product'

@ApiTags('Product')
@Controller('/product')
export class DeleteProductAction {
    constructor(private handler: DeleteProduct) {}

    @ApiOperation({ operationId: 'DeleteProduct', summary: 'Delete Product' })
    @ApiBadRequestResponse({
        type: HttpValidationError,
        description: 'Bad request response'
    })
    @ApiConflictResponse({ type: HttpError, description: 'Conflict response' })
    @ApiUnprocessableEntityResponse({ type: HttpError, description: 'Unprocessable entity response' })
    @ApiInternalServerErrorResponse({ type: HttpError, description: 'Internal server error response' })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        type: DeleteProductInput,
        description: 'Success response'
    })
    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    async handle(@Body() input: DeleteProductInput): Promise<void> {
        return this.handler.handle(input)
    }
}