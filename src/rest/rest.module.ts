import { Module } from '@nestjs/common'

@Module({
  imports: [EmporiumModule],
  providers: [HttpErrorService],
  // Try to keep the alphabetical order because swagger sorts by that.
  controllers: [HealthCheckAction, DocsRedocAction, CreateEmporiumAction],
  exports: [HttpErrorService]
})
export class RestModule {}
