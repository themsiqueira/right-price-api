import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromotionEntity } from '@app/promotion/entities/promotion.entity';
import { CreatePromotionInput } from '@app/promotion/input/create-promotion.input';
import { CreatePromotionOutput } from '@app/promotion/output/create-promotion.output';

@Injectable()
export class CreatePromotion {
  constructor(
    @InjectRepository(PromotionEntity)
    private readonly promotionRepository: Repository<PromotionEntity>,
  ) {}

  async handle(input: CreatePromotionInput): Promise<CreatePromotionOutput> {
    const promotion = await this.promotionRepository.save(
      this.promotionRepository.create(input),
    );

    return this.mapOutput(promotion);
  }

  private mapOutput(promotion: PromotionEntity): CreatePromotionOutput {
    return {
      id: promotion.id,
      price: promotion.price,
      createdAt: promotion.createdAt,
      expiresAt: promotion.expiresAt,
    };
  }
}
