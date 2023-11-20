import { Test, TestingModule } from '@nestjs/testing';
import { CreateProduct } from './create-product.usecase';
import { CreateProductInput } from '@app/product/input/create-product.input';
import { CreateProductOutput } from '@app/product/output/create-product.output';
import { ProductEntity } from '@app/product/entities/product.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CreateProduct', () => {
  let createProduct: CreateProduct;
  let productRepository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateProduct,
        {
          provide: getRepositoryToken(ProductEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    createProduct = module.get<CreateProduct>(CreateProduct);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should create a new product and return the created data', async () => {
    // Mock input data
    const input: CreateProductInput = {
      id: '1',
      name: 'New Product',
      // Add promotionIds if needed
    };

    // Mock the repository save method
    const product: ProductEntity = {
      id: '1',
      name: 'New Product',
      // Add promotionIds if needed
      createdAt: new Date(),
    };
    jest.spyOn(productRepository, 'save').mockResolvedValueOnce(product);

    // Execute the handle method
    const result: CreateProductOutput = await createProduct.handle(input);

    // Assert that the repository save method was called with the correct parameters
    expect(productRepository.save).toHaveBeenCalledWith(input);

    // Assert the output
    expect(result).toEqual({
      id: product.id,
      name: product.name,
      createdAt: product.createdAt,
      // Include other properties as needed
    });
    // Add more assertions if needed based on your specific requirements
  });
});
