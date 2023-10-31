import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { DeleteProductInput } from '@app/product/input/delete-product.input'
import { ProductEntity } from '@app/product/entities/product.entity'
import { ValidateService } from '@app/shared/services/validate.service'

@Injectable()
export class DeleteProduct {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly validateService: ValidateService
  ) {}

  async handle(input: DeleteProductInput): Promise<void> {
    const inputValidated = await this.validateService.validateAndTransformInput(DeleteProductInput, input)
    const product = await this.productRepository.findOne({ where: { id: inputValidated.id } })
    if (!product) {
      throw new NotFoundException('Product not found')
    }
    product.deletedAt = new Date()
    await this.productRepository.save(product)
  }
}
