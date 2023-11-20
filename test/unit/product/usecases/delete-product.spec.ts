import { Test, TestingModule } from '@nestjs/testing';
import { DeleteProduct } from './delete-product.usecase';
import { ProductEntity } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DeleteProductInput } from '../input/delete-product.input';

describe('DeleteProduct', () => {
  let deleteProduct: DeleteProduct;
  let productRepository: Repository<ProductEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteProduct,
        {
          provide: getRepositoryToken(ProductEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    deleteProduct = module.get<DeleteProduct>(DeleteProduct);
    productRepository = module.get<Repository<ProductEntity>>(
      getRepositoryToken(ProductEntity),
    );
  });

  it('should delete a product', async () => {
    const deleteProductInput: DeleteProductInput = {
      id: 'product_id',
    };

    const existingProduct = new ProductEntity();
    existingProduct.id = deleteProductInput.id;
    existingProduct.isDeleted = false;

    jest
      .spyOn(productRepository, 'findOne')
      .mockReturnValue(Promise.resolve(existingProduct));
    jest
      .spyOn(productRepository, 'save')
      .mockReturnValue(Promise.resolve(existingProduct));

    await deleteProduct.handle(deleteProductInput);

    expect(existingProduct.isDeleted).toBe(true);
    expect(existingProduct.deletedAt).toBeInstanceOf(Date);
  });

  it('should throw NotFoundException if product not found', async () => {
    const deleteProductInput: DeleteProductInput = {
      id: 'nonexistent_id',
    };

    jest
      .spyOn(productRepository, 'findOne')
      .mockReturnValue(Promise.resolve(undefined));

    await expect(deleteProduct.handle(deleteProductInput)).rejects.toThrowError(
      NotFoundException,
    );
  });
});
