import { Injectable, NotFoundException } from '@nestjs/common'

import { DeleteProductInput } from '@app/product/input/delete-product.input'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductEntity } from '../entities/product.entity'
import { Repository } from 'typeorm'

@Injectable()
export class DeleteProduct {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async handle (input: DeleteProductInput): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id: input.id } })
    if (!product) {
      throw new NotFoundException('Product not found')
    }

    product.isDeleted = true
    product.deletedAt = new Date()
    await this.productRepository.save(product)
  }
}
