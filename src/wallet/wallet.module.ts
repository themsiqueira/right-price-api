import { Module } from '@nestjs/common'

import { GetWalletData } from '@app/wallet/usecases/get-wallet-data'

@Module({
  imports: [],
  providers: [GetWalletData],
  exports: [GetWalletData]
})
export class WalletModule {}
