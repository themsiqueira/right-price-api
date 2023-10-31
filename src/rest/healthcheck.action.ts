import { ApiTags, ApiOkResponse, ApiOperation, ApiBadRequestResponse } from '@nestjs/swagger'
import { Controller, Get } from '@nestjs/common'

import { HttpValidationError } from '@app/rest/swagger/error.model'

@ApiTags('HealthCheck')
@Controller('/')
export class HealthCheckAction {
  @ApiOperation({ operationId: 'HealthCheck', summary: 'Health Check endpoint' })
  /*
    Adding 'type: HttpValidationError' is workaround for 'Could not resolve reference: #/components/schemas/HttpValidationError'.
    getSchemaPath adding "$ref: "#/components/schemas/CarrierEntitlementCreateInput" to the output, but not creating schema itself.
    Thus in swagger json there is no HttpValidationError, but we have reference to is
  */
  @ApiBadRequestResponse({
    type: HttpValidationError,
    description: 'Bad body request response'
  })
  @ApiOkResponse({
    schema: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'Ok',
          description: 'This property is an indicator of success'
        },
        time: {
          type: 'string',
          example: 'Tue Aug 31 2021',
          description: 'This property is the current date'
        }
      }
    },
    description: 'Success response'
  })
  @Get()
  action(): Record<string, string> {
    return {
      status: 'Ok',
      time: new Date().toDateString()
    }
  }
}
