import { Injectable, NotFoundException } from '@nestjs/common'

import { GetProductInput } from '@app/product/input/get-product.input'
import { GetProductOutput } from '@app/product/output/get-product.output'
import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductEntity } from '../entities/product.entity'
import { Repository } from 'typeorm'

@Injectable()
export class GetProduct {
  constructor (
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async handle (input: GetProductInput): Promise<GetProductOutput> {
    const product = await this.productRepository.findOne({where: { id: input.id }});

    if (!product){
      throw new NotFoundException('Product not found');
    }

    const productOutput: GetProductOutput = {
      id: product.id,
      name: product.name,
      promotion: product.promotion,
      createdAt: product.createdAt,
      expiresAt: product.expiresAt,
      isDeleted: product.isDeleted,
      deletedAt: product.deletedAt,
    };

    return productOutput;
  }
}
