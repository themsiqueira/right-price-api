import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromotionEntity } from '../entities/promotion.entity';
import { GetPromotionInput } from '../input/get-promotion.input';
import { GetPromotionOutput } from '../output/get-promotion.output';

@Injectable()
export class GetPromotion {
  constructor(
    @InjectRepository(PromotionEntity)
    private readonly promotionRepository: Repository<PromotionEntity>,
  ) {}

  async handle(input: GetPromotionInput): Promise<GetPromotionOutput> {
    const promotion = await this.promotionRepository.findOne({
      where: { id: input.id },
    });

    if (!promotion) {
      throw new NotFoundException('Promotion not found');
    }

    const promotionOutput: GetPromotionOutput = {
      id: promotion.id,
      price: promotion.price,
      createdAt: promotion.createdAt,
      expiresAt: promotion.expiresAt,
    };

    return promotionOutput;
  }
}
