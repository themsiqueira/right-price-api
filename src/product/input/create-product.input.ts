import { IsNotEmpty, IsString } from 'class-validator';
import { PromotionEntity } from '../entities/promotion.entity';

export class CreateProductInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  // Optionally link to a PromotionEntity
  promotionIds?: PromotionEntity[];

  @IsString()
  @IsNotEmpty()
  id: string; 
}
