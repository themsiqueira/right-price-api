import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { UpdateProduct } from './update-product.usecase';
import { ProductEntity } from '../entities/product.entity';
import { UpdateProductInput } from '../input/update-product.input';
import { UpdateProductOutput } from '../output/update-product.output';

// Mock do repositório do TypeORM
class MockProductRepository {
  findOne() {
    return this;
  }

  save() {
    return {};
  }
}

describe('UpdateProduct', () => {
  let updateProduct: UpdateProduct;
  let productRepository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateProduct,
        {
          provide: getRepositoryToken(ProductEntity),
          useClass: MockProductRepository,
        },
      ],
    }).compile();

    updateProduct = module.get<UpdateProduct>(UpdateProduct);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should be defined', () => {
    expect(updateProduct).toBeDefined();
  });

  describe('handle', () => {
    it('should update product and return product id', async () => {
      const mockProduct = new ProductEntity();
      mockProduct.id = '1';

      jest
        .spyOn(productRepository, 'findOne')
        .mockReturnValue(Promise.resolve(mockProduct));

      jest.spyOn(productRepository, 'save').mockReturnValue(Promise.resolve({}));

      const input: UpdateProductInput = {
        id: '1',
        name: 'Updated Product',
        expiresAt: new Date(),
      };

      const result: UpdateProductOutput = await updateProduct.handle(input);

      expect(result).toEqual({
        id: '1',
      });
    });

    it('should throw NotFoundException when product not found', async () => {
      jest.spyOn(productRepository, 'findOne').mockReturnValue(Promise.resolve(null));

      const input: UpdateProductInput = {
        id: '1',
        name: 'Updated Product',
        expiresAt: new Date(),
      };

      await expect(updateProduct.handle(input)).rejects.toThrowError(
        NotFoundException,
      );
    });

    // Add more test cases as needed based on your specific logic and conditions
  });
});
