import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { ListProduct } from './list-product.usecase';
import { ProductEntity } from '../entities/product.entity';
import { ListProductInput } from '../input/list-product.input';
import { ListProductOutput } from '../output/list-product.output';

// Mock do repositório do TypeORM
class MockProductRepository {
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

describe('ListProduct', () => {
  let listProduct: ListProduct;
  let productRepository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListProduct,
        {
          provide: getRepositoryToken(ProductEntity),
          useClass: MockProductRepository,
        },
      ],
    }).compile();

    listProduct = module.get<ListProduct>(ListProduct);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should be defined', () => {
    expect(listProduct).toBeDefined();
  });

  describe('handle', () => {
    it('should return empty array when no products found', async () => {
      jest.spyOn(productRepository, 'getMany').mockReturnValue(Promise.resolve([]));

      const input: ListProductInput = {};
      const result: ListProductOutput[] = await listProduct.handle(input);

      expect(result).toEqual([]);
    });

    it('should return list of products when products found', async () => {
      const mockProduct = new ProductEntity();
      mockProduct.id = '1';
      mockProduct.name = 'Product A';

      jest
        .spyOn(productRepository, 'getMany')
        .mockReturnValue(Promise.resolve([mockProduct]));

      const input: ListProductInput = {};
      const result: ListProductOutput[] = await listProduct.handle(input);

      expect(result).toEqual([
        {
          id: '1',
          name: 'Product A',
        },
      ]);
    });

    it('should apply filters and pagination when provided', async () => {
      const mockProduct = new ProductEntity();
      mockProduct.id = '1';
      mockProduct.name = 'Product A';

      jest
        .spyOn(productRepository, 'getMany')
        .mockReturnValue(Promise.resolve([mockProduct]));

      const input: ListProductInput = {
        name: 'Product A',
        createdAt: new Date(),
        expiresAt: new Date(),
        promotion: new PromotionEntity(), // assuming you have a PromotionEntity instance
        page: 1,
        limit: 10,
      };

      const result: ListProductOutput[] = await listProduct.handle(input);

      expect(result).toEqual([
        {
          id: '1',
          name: 'Product A',
        },
      ]);

      // You can add more assertions based on your specific filters and pagination logic
    });
  });
});
