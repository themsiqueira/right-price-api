import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectEntityManager } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { UpdatePromotionInput } from '@app/product/input/update-promotion.input'
import { UpdatePromotionOutput } from '@app/product/output/update-promotion.output'
import { ValidateService } from '@app/shared/services/validate.service'
import { PromotionEntity } from '@app/product/entities/promotion.entity'

@Injectable()
export class UploadPromotion {
  private readonly promotionRepository: Repository<PromotionEntity>

  constructor(
    @InjectEntityManager() private readonly dataSource: DataSource,
    private readonly validateService: ValidateService
  ) {
    this.promotionRepository = this.dataSource.getRepository(PromotionEntity)
  }

  async handle(input: UpdatePromotionInput): Promise<UpdatePromotionOutput> {
    const inputValidated = await this.validateService.validateAndTransformInput(UpdatePromotionInput, input)
    const promotion = await this.promotionRepository.findOne({ where: { id: inputValidated.id } })
    if (!promotion) {
      throw new NotFoundException('Product not found')
    }

    if (inputValidated.expiresAt) {
      promotion.expiresAt = inputValidated.expiresAt
    }
    await this.promotionRepository.save(promotion)

    return plainToClass(UpdatePromotionOutput, promotion)
  }
}
