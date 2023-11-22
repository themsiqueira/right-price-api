import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'

import { DeleteProductInput } from '@app/product/input/delete-product.input'
import { ProductEntity } from '@app/product/entities/product.entity'
import { ValidateService } from '@app/shared/services/validate.service'

@Injectable()
export class DeleteProduct {
  private readonly productRepository: Repository<ProductEntity>

  constructor(
    @InjectEntityManager() private readonly dataSource: DataSource,
    private readonly validateService: ValidateService
  ) {
    this.productRepository = this.dataSource.getRepository(ProductEntity)
  }

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
