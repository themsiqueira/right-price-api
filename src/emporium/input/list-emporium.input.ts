import { IsOptional, IsNumber, IsString } from 'class-validator';

export class ListEmporiumInput {
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
  address?: string; // Optional filter by address (TODO: split address into street, city, state, country, zip code, etc.)
}
