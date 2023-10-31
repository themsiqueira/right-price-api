import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { ListPromotionOutput } from '@app/product/output/list-promotion.output'
import { ListPromotionInput } from '@app/product/input/list-promotion.input'
import { ValidateService } from '@app/shared/services/validate.service'
import { PromotionEntity } from '@app/product/entities/promotion.entity'
import { GetPromotionOutput } from '@app/product/output/get-promotion.output'

@Injectable()
export class ListPromotion {
  constructor(
    @InjectRepository(PromotionEntity)
    private readonly promotionRepository: Repository<PromotionEntity>,
    private readonly validateService: ValidateService
  ) {}

  async handle(input: ListPromotionInput): Promise<ListPromotionOutput> {
    const inputValidated = await this.validateService.validateAndTransformInput(ListPromotionInput, input)
    const queryBuilder = this.promotionRepository.createQueryBuilder('product')

    if (inputValidated.productId) {
      queryBuilder.where('promotion.productId = :productId', { productId: inputValidated.productId })
    }

    const page = inputValidated.page || 1
    const limit = inputValidated.limit || 10
    const skip = (page - 1) * limit
    const total = await queryBuilder.getCount()

    const products = await queryBuilder.skip(skip).take(limit).getMany()
    return this.mapOutput(total, page, products)
  }

  private mapOutput(total: number, page: number, data: Array<PromotionEntity>): ListPromotionOutput {
    return {
      total,
      page,
      data: data.map((item) => plainToClass(GetPromotionOutput, item))
    }
  }
}
