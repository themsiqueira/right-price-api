import { IsOptional, IsNumber, IsString, IsDate } from 'class-validator';
import { PromotionEntity } from '../entities/promotion.entity';
import { Relation } from 'typeorm';

export class ListProductInput {
  @IsOptional()
  @IsString()
  name?: string; // Optional filter by name

  @IsOptional()
  @IsNumber()
  page?: number; // Optional page number for pagination

  @IsOptional()
  @IsNumber()
  limit?: number; // Optional limit for the number of results per page

  @IsOptional()
  @IsString()
  promotion?: PromotionEntity; // Optional filter by promotion

  @IsOptional()
  @IsDate()
  createdAt?: Date; // Optional filter by createdAt

  @IsOptional()
  @IsDate()
  expiresAt?: Date; // Optional filter by expiresAt
}
