import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromotionEntity } from '../entities/promotion.entity';
import { UpdatePromotionInput } from '../input/update-promotion.input';
import { UpdatePromotionOutput } from '../output/update-promotion.output';

@Injectable()
export class UpdatePromotion {
  constructor(
    @InjectRepository(PromotionEntity)
    private readonly promotionRepository: Repository<PromotionEntity>,
  ) {}

  async handle(input: UpdatePromotionInput): Promise<UpdatePromotionOutput> {
    const promotion = await this.promotionRepository.findOne({ where: { id: input.id } });

    if (!promotion) {
      throw new NotFoundException('Promotion not found');
    }

    promotion.price = input.price;
    promotion.expiresAt = input.expiresAt;

    await this.promotionRepository.save(promotion);

    const promotionOutput: UpdatePromotionOutput = {
      id: promotion.id,
      price: promotion.price,
      createdAt: promotion.createdAt,
      expiresAt: promotion.expiresAt,
    };

    return promotionOutput;
  }
}
