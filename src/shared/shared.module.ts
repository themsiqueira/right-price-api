import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { databaseProviders } from '@app/shared/custom-providers/database.provider'
import { ErrorService } from '@app/shared/services/error.service'
import { ValidateService } from '@app/shared/services/validate.service'

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [...databaseProviders, ErrorService, ValidateService],
  exports: [...databaseProviders, ErrorService, ValidateService]
})
export class SharedModule {}
