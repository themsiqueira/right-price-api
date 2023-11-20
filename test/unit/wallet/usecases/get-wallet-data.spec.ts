import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetWallet } from './get-wallet.use-case';
import { GetWalletInput } from './get-wallet.input';
import { GetWalletOutput } from './get-wallet.output';
import { WalletEntity } from '../entities/wallet.entity';
import { CouponEntity } from '@app/emporium/entities/coupon.entity';
import { Repository } from 'typeorm';

class MockWalletRepository extends Repository<WalletEntity> {}

describe('GetWallet', () => {
  let getWallet: GetWallet;
  let walletRepository: MockWalletRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetWallet,
        {
          provide: getRepositoryToken(WalletEntity),
          useClass: MockWalletRepository,
        },
      ],
    }).compile();

    getWallet = module.get<GetWallet>(GetWallet);
    walletRepository = module.get<MockWalletRepository>(getRepositoryToken(WalletEntity));
  });

  it('should be defined', () => {
    expect(getWallet).toBeDefined();
  });

  describe('handle', () => {
    it('should return wallet data for a given user', async () => {
      const input: GetWalletInput = {
        userId: 'user_id',
      };

      const mockedWallet = new WalletEntity();
      mockedWallet.id = 'wallet_id';
      mockedWallet.userId = 'user_id';
      mockedWallet.couponsIds = [new CouponEntity()];
      mockedWallet.deletedAt = null;
      mockedWallet.createdAt = new Date('2023-01-01');
      mockedWallet.expiresAt = new Date('2023-12-31');

      jest.spyOn(walletRepository, 'createQueryBuilder').mockReturnValue(MockWalletRepository as any);
      jest.spyOn(walletRepository, 'leftJoinAndSelect').mockReturnValue(MockWalletRepository as any);
      jest.spyOn(walletRepository, 'where').mockReturnValue(MockWalletRepository as any);
      jest.spyOn(walletRepository, 'getOne').mockReturnValue(mockedWallet);

      const result: GetWalletOutput = await getWallet.handle(input);

      expect(walletRepository.createQueryBuilder).toHaveBeenCalledWith('wallet');
      expect(walletRepository.leftJoinAndSelect).toHaveBeenCalledWith('wallet.couponsIds', 'coupons');
      expect(walletRepository.where).toHaveBeenCalledWith('wallet.userId = :userId', { userId: input.userId });
      expect(walletRepository.getOne).toHaveBeenCalled();
      expect(result).toEqual({
        id: mockedWallet.id,
        userId: mockedWallet.userId,
        coupons: mockedWallet.couponsIds.map(coupon => ({
          id: coupon.id,
        })),
        deletedAt: null,
        createdAt: mockedWallet.createdAt,
        expiresAt: mockedWallet.expiresAt,
      });
    });

    it('should throw an error for a non-existing wallet', async () => {
      const input: GetWalletInput = {
        userId: 'non_existing_user',
      };

      jest.spyOn(walletRepository, 'createQueryBuilder').mockReturnValue(MockWalletRepository as any);
      jest.spyOn(walletRepository, 'leftJoinAndSelect').mockReturnValue(MockWalletRepository as any);
      jest.spyOn(walletRepository, 'where').mockReturnValue(MockWalletRepository as any);
      jest.spyOn(walletRepository, 'getOne').mockReturnValue(undefined);

      await expect(getWallet.handle(input)).rejects.toThrowError('Carteira não encontrada para o usuário fornecido.');
    });
  });
});
