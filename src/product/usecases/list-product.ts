import { Injectable } from '@nestjs/common'

import { ListProductInput } from '@app/product/input/list-product.input'
import { ListProductOutput } from '@app/product/output/list-product.output'
import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductEntity } from '../entities/product.entity'
import { Repository } from 'typeorm'

@Injectable()
export class ListProduct {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async handle(input: ListProductInput): Promise<ListProductOutput[]> {
    // Create a query builder for the ProductEntity
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    // Apply filters if provided in the input
    if (input.name) {
      queryBuilder.where('product.name = :name', { name: input.name });
    }

    if (input.createdAt) {
      queryBuilder.where('product.createdAt = :createdAt', { createdAt: input.createdAt });
    }

    if (input.expiresAt){
      queryBuilder.where('product.expiresAt = :expiresAt', { expiresAt: input.expiresAt });
    }

    if (input.promotion){
      queryBuilder.where('product.promotion = :promotion', { promotion: input.promotion });
    }

    // Pagination
    const page = input.page || 1;
    const limit = input.limit || 10;
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    // Execute the query and retrieve the list of products
    const products = await queryBuilder.getMany();

    // Map the results to the ListProductOutput format
    const productOutputs: ListProductOutput[] = products.map((product) => ({
      id: product.id,
      name: product.name,
    }));

    return productOutputs;
  }
}
