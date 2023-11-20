import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { UpdatePromotion } from './update-promotion.usecase';
import { PromotionEntity } from '../entities/promotion.entity';
import { UpdatePromotionInput } from '../input/update-promotion.input';
import { UpdatePromotionOutput } from '../output/update-promotion.output';

// Mock do repositório do TypeORM
class MockPromotionRepository {
  findOne() {
    return this;
  }

  save() {
    return {};
  }
}

describe('UpdatePromotion', () => {
  let updatePromotion: UpdatePromotion;
  let promotionRepository: Repository<PromotionEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdatePromotion,
        {
          provide: getRepositoryToken(PromotionEntity),
          useClass: MockPromotionRepository,
        },
      ],
    }).compile();

    updatePromotion = module.get<UpdatePromotion>(UpdatePromotion);
    promotionRepository = module.get<Repository<PromotionEntity>>(
      getRepositoryToken(PromotionEntity),
    );
  });

  it('should be defined', () => {
    expect(updatePromotion).toBeDefined();
  });

  describe('handle', () => {
    it('should update promotion and return promotion details', async () => {
      const mockPromotion = new PromotionEntity();
      mockPromotion.id = '1';

      jest
        .spyOn(promotionRepository, 'findOne')
        .mockReturnValue(Promise.resolve(mockPromotion));

      jest.spyOn(promotionRepository, 'save').mockReturnValue(Promise.resolve({}));

      const input: UpdatePromotionInput = {
        id: '1',
        price: 19.99,
        expiresAt: new Date(),
      };

      const result: UpdatePromotionOutput = await updatePromotion.handle(input);

      expect(result).toEqual({
        id: '1',
        price: 19.99,
        // Include other expected fields here
      });
    });

    it('should throw NotFoundException when promotion not found', async () => {
      jest.spyOn(promotionRepository, 'findOne').mockReturnValue(Promise.resolve(null));

      const input: UpdatePromotionInput = {
        id: '1',
        price: 19.99,
        expiresAt: new Date(),
      };

      await expect(updatePromotion.handle(input)).rejects.toThrowError(
        NotFoundException,
      );
    });

    // Add more test cases as needed based on your specific logic and conditions
  });
});
