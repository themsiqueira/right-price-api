import { Test, TestingModule } from '@nestjs/testing';
import { GetProduct } from './get-product.usecase';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GetProductInput } from '../input/get-product.input';

describe('GetProduct', () => {
  let getProduct: GetProduct;
  let productRepository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetProduct,
        {
          provide: getRepositoryToken(ProductEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    getProduct = module.get<GetProduct>(GetProduct);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should get a product', async () => {
    const getProductInput: GetProductInput = {
      id: 'product_id',
    };

    const existingProduct = new ProductEntity();
    existingProduct.id = getProductInput.id;

    jest
      .spyOn(productRepository, 'findOne')
      .mockReturnValue(Promise.resolve(existingProduct));

    const result = await getProduct.handle(getProductInput);

    expect(result).toEqual({
      id: existingProduct.id,
      name: existingProduct.name,
      promotion: existingProduct.promotion,
      createdAt: existingProduct.createdAt,
      expiresAt: existingProduct.expiresAt,
      isDeleted: existingProduct.isDeleted,
      deletedAt: existingProduct.deletedAt,
    });
  });

  it('should throw NotFoundException if product not found', async () => {
    const getProductInput: GetProductInput = {
      id: 'nonexistent_id',
    };

    jest
      .spyOn(productRepository, 'findOne')
      .mockReturnValue(Promise.resolve(undefined));

    await expect(getProduct.handle(getProductInput)).rejects.toThrowError(
      NotFoundException,
    );
  });
});
