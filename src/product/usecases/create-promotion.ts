import { Injectable } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { CreatePromotionInput } from '@app/product/input/create-promotion.input'
import { CreatePromotionOutput } from '@app/product/output/create-promotion.output'
import { ValidateService } from '@app/shared/services/validate.service'
import { PromotionEntity } from '@app/product/entities/promotion.entity'
import { ProductEntity } from '@app/product/entities/product.entity'

@Injectable()
export class CreatePromotion {
  private readonly productRepository: Repository<ProductEntity>
  private readonly promotionRepository: Repository<PromotionEntity>

  constructor(
    @InjectEntityManager() private readonly dataSource: DataSource,
    private readonly validateService: ValidateService
  ) {
    this.productRepository = this.dataSource.getRepository(ProductEntity)
    this.promotionRepository = this.dataSource.getRepository(PromotionEntity)
  }
  async handle(input: CreatePromotionInput): Promise<CreatePromotionOutput> {
    const inputValidated = await this.validateService.validateAndTransformInput(CreatePromotionInput, input)
    const product = await this.productRepository.findOne({ where: { id: inputValidated.productId } })
    const promotionEntity = this.promotionRepository.create({ ...inputValidated, product })
    const result = await this.promotionRepository.save(promotionEntity)
    return plainToClass(CreatePromotionOutput, { ...result, product })
  }
}
