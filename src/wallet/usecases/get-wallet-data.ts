import { Injectable } from '@nestjs/common'

import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { GetWalletDataInput } from '@app/wallet/input/get-wallet-data.input'
import { GetWalletDataOutput } from '@app/wallet/output/get-wallet-data.output'

@Injectable()
export class GetWalletData {
  handle(input: GetWalletDataInput): Promise<GetWalletDataOutput> {
    throw new MethodNotImplementedException(this.handle.name)
  }
}
