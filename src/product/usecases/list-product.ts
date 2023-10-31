import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { ListProductInput } from '@app/product/input/list-product.input'
import { ListProductOutput } from '@app/product/output/list-product.output'
import { ProductEntity } from '@app/product/entities/product.entity'
import { ValidateService } from '@app/shared/services/validate.service'
import { GetProductOutput } from '@app/product/output/get-product.output'

@Injectable()
export class ListProduct {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly validateService: ValidateService
  ) {}

  async handle(input: ListProductInput): Promise<ListProductOutput> {
    const inputValidated = await this.validateService.validateAndTransformInput(ListProductInput, input)
    const queryBuilder = this.productRepository.createQueryBuilder('product')

    if (inputValidated.name) {
      queryBuilder.where('product.name = :name', { name: `%${inputValidated.name}%` })
    }

    const page = input.page || 1
    const limit = input.limit || 10
    const skip = (page - 1) * limit
    const total = await queryBuilder.getCount()

    const products = await queryBuilder.skip(skip).take(limit).getMany()
    return this.mapOutput(total, page, products)
  }

  private mapOutput(total: number, page: number, data: Array<ProductEntity>): ListProductOutput {
    return {
      total,
      page,
      data: data.map((item) => plainToClass(GetProductOutput, item))
    }
  }
}
