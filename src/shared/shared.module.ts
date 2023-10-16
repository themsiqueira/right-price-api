import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { databaseProviders } from '@app/shared/custom-providers/database.provider';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [...databaseProviders],
  exports: [...databaseProviders]
})
export class SharedModule {}
