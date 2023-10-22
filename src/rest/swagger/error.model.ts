import { ApiProperty } from '@nestjs/swagger'

import { StandardError, ValidationElement } from '@app/shared/interface/error.interface'

class HttpValidationElement implements ValidationElement {
  @ApiProperty()
  property?: string
  @ApiProperty({
    type: 'object',
    additionalProperties: {
      type: 'string'
    },
    description: 'Is an object {[key: string]: [value: string]}',
    example: '{"isNotEmpty": "should not be empty"}'
  })
  constraints?: { [type: string]: string }
}
export class HttpError implements StandardError {
  @ApiProperty({ description: 'This property is the type of HttpError' })
  type: string
  @ApiProperty({ description: 'This property is an array of strings from errors' })
  errors: string[]
}

export class HttpValidationError implements StandardError {
  @ApiProperty({ description: 'This property is the type of HttpValidationError' })
  type: string
  @ApiProperty({
    type: [HttpValidationElement],
    description: 'This property is an array of strings from errors'
  })
  errors: HttpValidationElement[]
}
