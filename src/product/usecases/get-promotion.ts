import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm'
import { DataSource, Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import { GetPromotionInput } from '@app/product/input/get-promotion.input'
import { GetPromotionOutput } from '@app/product/output/get-promotion.output'
import { PromotionEntity } from '@app/product/entities/promotion.entity'
import { ValidateService } from '@app/shared/services/validate.service'

@Injectable()
export class GetPromotion {
  private readonly promotionRepository: Repository<PromotionEntity>

  constructor(
    @InjectEntityManager() private readonly dataSource: DataSource,
    private readonly validateService: ValidateService
  ) {
    this.promotionRepository = this.dataSource.getRepository(PromotionEntity)
  }
  async handle(input: GetPromotionInput): Promise<GetPromotionOutput> {
    const inputValidated = await this.validateService.validateAndTransformInput(GetPromotionInput, input)
    const promotion = await this.promotionRepository.findOne({ where: { id: inputValidated.id } })

    if (!promotion) {
      throw new NotFoundException('Promotion not found')
    }

    return plainToClass(GetPromotionOutput, promotion)
  }
}
