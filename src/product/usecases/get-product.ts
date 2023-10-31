import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { GetProductInput } from '@app/product/input/get-product.input'
import { GetProductOutput } from '@app/product/output/get-product.output'
import { ValidateService } from '@app/shared/services/validate.service'
import { ProductEntity } from '@app/product/entities/product.entity'

@Injectable()
export class GetProduct {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly validateService: ValidateService
  ) {}

  async handle(input: GetProductInput): Promise<GetProductOutput> {
    const inputValidated = await this.validateService.validateAndTransformInput(GetProductInput, input)
    const product = await this.productRepository.findOne({ where: { id: inputValidated.id } })

    if (!product) {
      throw new NotFoundException('Product not found')
    }

    return plainToClass(GetProductOutput, product)
  }
}
