
import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { GetWalletDataInput } from '@app/wallet/input/get-wallet-data.input'
import { GetWalletDataOutput } from '@app/wallet/output/get-wallet-data.output'
import { Injectable, NotFoundException } from '@nestjs/common';
import { WalletEntity } from '@app/wallet/entities/wallet.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GetWallet {
  constructor(
    @InjectRepository(WalletEntity) private readonly walletRepository: Repository<WalletEntity>,
  ) {}

  async handle(input: GetWalletInput): Promise<GetWalletOutput> {
    const wallet = await this.walletRepository
      .createQueryBuilder('wallet')
      .leftJoinAndSelect('wallet.couponsIds', 'coupons')
      .where('wallet.userId = :userId', { userId: input.userId })
      .getOne();

    if (!wallet) {
      throw new NotFoundException('Carteira não encontrada para o usuário fornecido.');
    }

    return {
      id: wallet.id,
      userId: wallet.userId,
      coupons: wallet.couponsIds.map(coupon => ({
        id: coupon.id,
      })),
      deletedAt: wallet.deletedAt,
      createdAt: wallet.createdAt,
      expiresAt: wallet.expiresAt,
    };
  }
}
