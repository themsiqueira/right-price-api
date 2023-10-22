import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { Response, Request } from 'express'
import { RequestContext } from '@medibloc/nestjs-request-context'

import { HttpErrorService } from '@app/rest/service/http-error.service'
import LoggerContext from '@app/shared/logger/logger.context'
import Logger from '@app/shared/logger/logger'
import { StandardError } from '@app/shared/interface/error.interface'
import { mapRequest, RequestDebug } from '@app/shared/helper/request.helper'
import maskData from '@app/shared/helper/mask-data.helper'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpErrorService: HttpErrorService,
    private readonly logger: Logger
  ) {}

  catch(anyException: unknown, host: ArgumentsHost): Response {
    const response = host.switchToHttp().getResponse<Response>()
    const request = host.switchToHttp().getRequest<Request>()
    const traceId = this.getTraceId(request.headers['x-cloud-trace-context'] as string)

    const { status, exception } = this.httpErrorService.createHttpException(anyException)

    const requestMapped = mapRequest(request)

    if (this.isInvalidContext()) {
      this.initLogger(`${request.method}: ${request.path}`, traceId, requestMapped)
    }
    this.logErrors(requestMapped, status, exception)

    return response.status(status).json(exception)
  }

  private initLogger(operation: string, traceId: string, request: RequestDebug): void {
    RequestContext.start(LoggerContext)

    this.logger.setRequestId(`${process.env.ENVIRONMENT}=${traceId}`)
    this.logger.setOperation(operation)

    this.logger.info('API call request', {
      request: maskData(request, this.logger)
    })
  }

  private logErrors(request: RequestDebug, status: number, exception: StandardError): void {
    this.logger.error('API call error', {
      request: maskData(request, this.logger),
      response: {
        statusCode: status,
        error: exception.errors,
        type: exception.type
      }
    })
  }

  private isInvalidContext(): boolean {
    const ctx = RequestContext.get<LoggerContext>()
    return !ctx || ctx.requestId === ''
  }

  private getTraceId(traceContext = ''): string {
    return traceContext.split('/')[0]
  }
}
