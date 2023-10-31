import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { UpdateProductInput } from '@app/product/input/update-product.input'
import { UpdateProductOutput } from '@app/product/output/update-product.output'
import { ProductEntity } from '@app/product/entities/product.entity'
import { ValidateService } from '@app/shared/services/validate.service'

@Injectable()
export class UpdateProduct {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly validateService: ValidateService
  ) {}

  async handle(input: UpdateProductInput): Promise<UpdateProductOutput> {
    const inputValidated = await this.validateService.validateAndTransformInput(UpdateProductInput, input)
    const product = await this.productRepository.findOne({ where: { id: inputValidated.id } })
    if (!product) {
      throw new NotFoundException('Product not found')
    }

    if (inputValidated.name) {
      product.name = inputValidated.name
    }
    await this.productRepository.save(product)

    return plainToClass(UpdateProductOutput, inputValidated)
  }
}
