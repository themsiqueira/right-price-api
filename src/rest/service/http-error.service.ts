import { HttpException } from '@nestjs/common/exceptions'
import { HttpStatus } from '@nestjs/common/enums'
import { Injectable } from '@nestjs/common'

import { StandardError } from '@app/shared/interface/error.interface'
import ErrorType from '@app/shared/constant/error.enum'
import { has } from '@app/shared/helper/type-guard.helper'
import { ErrorService } from '@app/shared/services/error.service'

type FinalException = {
  exception: StandardError
  status: number
}

type NormalizedExceptionResponse = { message: string; error: string }

@Injectable()
export class HttpErrorService {
  private readonly defaultStatus = HttpStatus.INTERNAL_SERVER_ERROR
  private readonly httpStatusMap = new Map<ErrorType, HttpStatus>([
    [ErrorType.INVALID_INPUT, HttpStatus.BAD_REQUEST],
    [ErrorType.DATA_NOT_FOUND, HttpStatus.NOT_FOUND],
    [ErrorType.CONFLICT, HttpStatus.CONFLICT],
    [ErrorType.UNPROCESSABLE_ENTITY, HttpStatus.UNPROCESSABLE_ENTITY],
    [ErrorType.TOO_MANY_REQUESTS, HttpStatus.TOO_MANY_REQUESTS],
    [ErrorType.FAILED_DEPENDENCY, HttpStatus.FAILED_DEPENDENCY],
    [ErrorType.PAYMENT_REQUIRED_ERROR, HttpStatus.PAYMENT_REQUIRED],
    [ErrorType.UNHANDLED_ERROR, HttpStatus.INTERNAL_SERVER_ERROR],
    [ErrorType.FORBIDDEN, HttpStatus.FORBIDDEN],
    [ErrorType.UNAUTHORIZED, HttpStatus.UNAUTHORIZED]
  ])

  constructor(private readonly errorService: ErrorService) {}

  createHttpException(exception: unknown): FinalException {
    if (this.errorService.isStandardError(exception)) {
      return {
        exception,
        status: this.getStandardStatus(exception)
      }
    } else if (exception instanceof HttpException) {
      const [baseErrors, errorType] = this.getBaseErrorsAndErrorTypeFromHttpException(exception)
      return {
        exception: this.errorService.createError(baseErrors, errorType),
        status: exception.getStatus()
      }
    }
    // We can not cover this line using 'exception instanceof Error'
    // https://github.com/facebook/jest/issues/2549
    const normalizedError = this.errorService.createError([(exception as Error).message]) // TODO: check posible undefined message
    return {
      exception: normalizedError,
      status: this.getStandardStatus(normalizedError)
    }
  }

  private getBaseErrorsAndErrorTypeFromHttpException(exception: HttpException): [string[], string?] {
    const exceptionResponse = exception.getResponse()
    if (typeof exceptionResponse === 'string') {
      return [[exceptionResponse]]
    }
    if (this.isNormalizedExceptionResponse(exceptionResponse)) {
      return [[exceptionResponse.message], exceptionResponse.error]
    }
    return [['unknown error: unable to handle HttpException response']]
  }

  private isNormalizedExceptionResponse(exceptionResponse: object): exceptionResponse is NormalizedExceptionResponse {
    return (
      exceptionResponse !== null &&
      has(exceptionResponse, 'message') &&
      typeof exceptionResponse.message === 'string' &&
      has(exceptionResponse, 'error') &&
      typeof exceptionResponse.error === 'string'
    )
  }

  private getStandardStatus(exception: StandardError): number {
    return this.httpStatusMap.get(exception.type as ErrorType) ?? this.defaultStatus
  }
}
