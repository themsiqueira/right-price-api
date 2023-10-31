import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { GetWalletData } from '@app/wallet/usecases/get-wallet-data'
import { SharedModule } from '@app/shared/shared.module'
import { WalletEntity } from '@app/wallet/entities/wallet.entity'

@Module({
  imports: [SharedModule, TypeOrmModule.forFeature([WalletEntity])],
  providers: [GetWalletData],
  exports: [GetWalletData]
})
export class WalletModule {}
