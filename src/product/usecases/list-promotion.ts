import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromotionEntity } from '../entities/promotion.entity';
import { ListPromotionInput } from '../input/list-promotion.input';
import { ListPromotionOutput } from '../output/list-promotion.output';

@Injectable()
export class ListPromotion {
  constructor(
    @InjectRepository(PromotionEntity)
    private readonly promotionRepository: Repository<PromotionEntity>,
  ) {}

  async handle(input: ListPromotionInput): Promise<ListPromotionOutput[]> {
    const queryBuilder = this.promotionRepository.createQueryBuilder('promotion');

    if (input.emporiumId) {
      queryBuilder.where('promotion.emporiumId = :emporiumId', { emporiumId: input.emporiumId });
    }

    const page = input.page || 1;
    const limit = input.limit || 10;
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    const promotions = await queryBuilder.getMany();

    const promotionOutputs: ListPromotionOutput[] = promotions.map((promotion) => ({
      id: promotion.id,
      price: promotion.price,
      createdAt: promotion.createdAt,
      expiresAt: promotion.expiresAt,
    }));

    return promotionOutputs;
  }
}
