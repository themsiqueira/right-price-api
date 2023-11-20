import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'

import { CreateProductInput } from '@app/product/input/create-product.input'
import { CreateProductOutput } from '@app/product/output/create-product.output'
import { ValidateService } from '@app/shared/services/validate.service'
import { ProductEntity } from '@app/product/entities/product.entity'

@Injectable()
export class CreateProduct {
  private readonly productRepository: Repository<ProductEntity>

  constructor(
    @InjectEntityManager() private readonly dataSource: DataSource,
    private readonly validateService: ValidateService
  ) {
    this.productRepository = this.dataSource.getRepository(ProductEntity)
  }

  async handle(input: CreateProductInput): Promise<CreateProductOutput> {
    const inputValidated = await this.validateService.validateAndTransformInput(CreateProductInput, input)
    const product = await this.productRepository.save(this.productRepository.create(inputValidated))
    return this.mapOutput(product)
  }

  private mapOutput(product: ProductEntity): CreateProductOutput {
    return Object.assign(new CreateProductOutput(), product)
  }
}
