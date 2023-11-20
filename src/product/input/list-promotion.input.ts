import { IsOptional, IsNumber, IsString } from 'class-validator';

export class ListPromotionInput {
  @IsOptional()
  @IsString()
  emporiumId?: string; // Optional filter by emporiumId

  @IsOptional()
  @IsNumber()
  page?: number; // Optional page number for pagination

  @IsOptional()
  @IsNumber()
  limit?: number; // Optional limit for the number of results per page
}