import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common'
import { Response, Request } from 'express'

import { HttpErrorService } from '@app/rest/service/http-error.service'
import { StandardError } from '@app/shared/interface/error.interface'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    private readonly httpErrorService: HttpErrorService,
    private readonly logger: Logger = new Logger()
  ) {}

  catch(anyException: unknown, host: ArgumentsHost): Response {
    const response = host.switchToHttp().getResponse<Response>()
    const request = host.switchToHttp().getRequest<Request>()

    const { status, exception } = this.httpErrorService.createHttpException(anyException)

    this.logErrors(request, status, exception)

    return response.status(status).json(exception)
  }

  private logErrors(request: Request, status: number, exception: StandardError): void {
    this.logger.error('API call error', {
      request: request,
      response: {
        statusCode: status,
        error: exception.errors,
        type: exception.type
      }
    })
  }
}
