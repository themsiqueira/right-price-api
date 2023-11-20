import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { GetWalletDataInput } from '@app/wallet/input/get-wallet-data.input'
import { GetWalletDataOutput } from '@app/wallet/output/get-wallet-data.output'
import { ValidateService } from '@app/shared/services/validate.service'
import { WalletEntity } from '@app/wallet/entities/wallet.entity'

@Injectable()
export class GetWalletData {
  private readonly walletRepository: Repository<WalletEntity>

  constructor(
    @InjectEntityManager() private readonly dataSource: DataSource,
    private readonly validateService: ValidateService
  ) {
    this.walletRepository = this.dataSource.getRepository(WalletEntity)
  }

  async handle(input: GetWalletDataInput): Promise<GetWalletDataOutput> {
    const inputValidated = await this.validateService.validateAndTransformInput(GetWalletDataInput, input)
    const wallet = await this.walletRepository.findOne({ where: { id: inputValidated.userId } })
    return plainToClass(GetWalletDataOutput, wallet)
  }
}
