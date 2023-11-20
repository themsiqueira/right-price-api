import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ListPromotion } from './list-promotion.usecase';
import { PromotionEntity } from '../entities/promotion.entity';
import { ListPromotionInput } from '../input/list-promotion.input';
import { ListPromotionOutput } from '../output/list-promotion.output';

// Mock do repositório do TypeORM
class MockPromotionRepository {
  createQueryBuilder() {
    return this;
  }

  where() {
    return this;
  }

  skip() {
    return this;
  }

  take() {
    return this;
  }

  getMany() {
    return [];
  }
}

describe('ListPromotion', () => {
  let listPromotion: ListPromotion;
  let promotionRepository: Repository<PromotionEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListPromotion,
        {
          provide: getRepositoryToken(PromotionEntity),
          useClass: MockPromotionRepository,
        },
      ],
    }).compile();

    listPromotion = module.get<ListPromotion>(ListPromotion);
    promotionRepository = module.get<Repository<PromotionEntity>>(
      getRepositoryToken(PromotionEntity),
    );
  });

  it('should be defined', () => {
    expect(listPromotion).toBeDefined();
  });

  describe('handle', () => {
    it('should return empty array when no promotions found', async () => {
      jest.spyOn(promotionRepository, 'getMany').mockReturnValue(Promise.resolve([]));

      const input: ListPromotionInput = {};
      const result: ListPromotionOutput[] = await listPromotion.handle(input);

      expect(result).toEqual([]);
    });

    it('should return list of promotions when promotions found', async () => {
      const mockPromotion = new PromotionEntity();
      mockPromotion.id = '1';
      mockPromotion.price = 100;

      jest
        .spyOn(promotionRepository, 'getMany')
        .mockReturnValue(Promise.resolve([mockPromotion]));

      const input: ListPromotionInput = {};
      const result: ListPromotionOutput[] = await listPromotion.handle(input);

      expect(result).toEqual([
        {
          id: '1',
          price: 100,
        },
      ]);
    });

    it('should apply filters and pagination when provided', async () => {
      const mockPromotion = new PromotionEntity();
      mockPromotion.id = '1';
      mockPromotion.price = 100;

      jest
        .spyOn(promotionRepository, 'getMany')
        .mockReturnValue(Promise.resolve([mockPromotion]));

      const input: ListPromotionInput = {
        emporiumId: 'emporium-1',
        page: 1,
        limit: 10,
      };

      const result: ListPromotionOutput[] = await listPromotion.handle(input);

      expect(result).toEqual([
        {
          id: '1',
          price: 100,
        },
      ]);

      // You can add more assertions based on your specific filters and pagination logic
    });
  });
});
