import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { GetProductInput } from '@app/product/input/get-product.input'
import { GetProductOutput } from '@app/product/output/get-product.output'
import { ValidateService } from '@app/shared/services/validate.service'
import { ProductEntity } from '../entities/product.entity'

@Injectable()
export class GetProduct {
  private readonly productRepository: Repository<ProductEntity>

  constructor(
    @InjectEntityManager() private readonly dataSource: DataSource,
    private readonly validateService: ValidateService
  ) {
    this.productRepository = this.dataSource.getRepository(ProductEntity)
  }

  async handle(input: GetProductInput): Promise<GetProductOutput> {
    const inputValidated = await this.validateService.validateAndTransformInput(GetProductInput, input)
    const product = await this.productRepository.findOne({ where: { id: inputValidated.id } })

    if (!product) {
      throw new NotFoundException('Product not found')
    }

    return plainToClass(GetProductOutput, product)
  }
}
