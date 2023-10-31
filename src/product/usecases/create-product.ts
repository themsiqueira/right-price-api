import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateProductInput } from '@app/product/input/create-product.input'
import { CreateProductOutput } from '@app/product/output/create-product.output'
import { ValidateService } from '@app/shared/services/validate.service'
import { ProductEntity } from '@app/product/entities/product.entity'

@Injectable()
export class CreateProduct {
  constructor(
    @InjectRepository(ProductEntity) private readonly productRepository: Repository<ProductEntity>,
    private readonly validateService: ValidateService
  ) {}

  async handle(input: CreateProductInput): Promise<CreateProductOutput> {
    const inputValidated = await this.validateService.validateAndTransformInput(CreateProductInput, input)
    const product = await this.productRepository.save(this.productRepository.create(inputValidated))
    return this.mapOutput(product)
  }

  private mapOutput(product: ProductEntity): CreateProductOutput {
    return Object.assign(new CreateProductOutput(), product)
  }
}
