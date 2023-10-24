import { Module } from '@nestjs/common'

import { EmporiumModule } from '@app/emporium/emporium.module'
import { HttpErrorService } from '@app/rest/service/http-error.service'
import { HealthCheckAction } from '@app/rest/healthcheck.action'
import { DocsRedocAction } from '@app/rest/redoc.action'
import { CreateEmporiumAction } from '@app/rest/emporium/create-emporium.action'
import { SharedModule } from '@app/shared/shared.module'

@Module({
  imports: [SharedModule, EmporiumModule],
  providers: [HttpErrorService],
  // Try to keep the alphabetical order because swagger sorts by that.
  controllers: [HealthCheckAction, DocsRedocAction, CreateEmporiumAction],
  exports: [HttpErrorService]
})
export class RestModule {}
