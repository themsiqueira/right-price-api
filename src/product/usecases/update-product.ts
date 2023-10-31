import { Injectable, NotFoundException } from '@nestjs/common'

import MethodNotImplementedException from '@app/shared/exception/method-not-implemented-exception.exception'
import { UpdateProductInput } from '@app/product/input/update-product.input'
import { UpdateProductOutput } from '@app/product/output/update-product.output'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductEntity } from '../entities/product.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UpdateProduct {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async handle(input: UpdateProductInput): Promise<UpdateProductOutput> {
    const product = await this.productRepository.findOne({where: {id: input.id}})
    if (!product) {
      throw new NotFoundException('Product not found')
    }

    if (input.name) {
      product.name = input.name
    }

    if (input.promotion) {
      product.promotion = input.promotion
    }

    if (input.expiresAt) {
      product.expiresAt = input.expiresAt
    }

    // Save the updated Product
    await this.productRepository.save(product)

    // Build the UpdateProductOutput
    const productOutput: UpdateProductOutput = {
      id: product.id,
    }

    return productOutput
  }
}
