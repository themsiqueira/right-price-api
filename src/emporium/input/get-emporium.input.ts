import { IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class GetEmporiumInput {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}