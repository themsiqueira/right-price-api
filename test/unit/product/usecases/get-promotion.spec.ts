import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GetPromotion } from './get-promotion.usecase';
import { PromotionEntity } from '../entities/promotion.entity';
import { GetPromotionInput } from '../input/get-promotion.input';
import { GetPromotionOutput } from '../output/get-promotion.output';

// Mock do repositório do TypeORM
class MockPromotionRepository {
  findOne() {}
}

describe('GetPromotion', () => {
  let getPromotion: GetPromotion;
  let promotionRepository: Repository<PromotionEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetPromotion,
        {
          provide: getRepositoryToken(PromotionEntity),
          useClass: MockPromotionRepository,
        },
      ],
    }).compile();

    getPromotion = module.get<GetPromotion>(GetPromotion);
    promotionRepository = module.get<Repository<PromotionEntity>>(
      getRepositoryToken(PromotionEntity),
    );
  });

  it('should be defined', () => {
    expect(getPromotion).toBeDefined();
  });

  describe('handle', () => {
    it('should return promotion when found', async () => {
      const mockPromotion = new PromotionEntity();
      mockPromotion.id = '1';
      mockPromotion.price = 20.0;
      mockPromotion.createdAt = new Date();
      mockPromotion.expiresAt = new Date();

      jest
        .spyOn(promotionRepository, 'findOne')
        .mockReturnValue(Promise.resolve(mockPromotion));

      const input: GetPromotionInput = { id: '1' };
      const result: GetPromotionOutput = await getPromotion.handle(input);

      expect(result).toEqual({
        id: '1',
        price: 20.0,
        createdAt: mockPromotion.createdAt,
        expiresAt: mockPromotion.expiresAt,
      });
    });

    it('should throw NotFoundException when promotion not found', async () => {
      jest
        .spyOn(promotionRepository, 'findOne')
        .mockReturnValue(Promise.resolve(undefined));

      const input: GetPromotionInput = { id: '1' };

      await expect(getPromotion.handle(input)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
