import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class GetEmporiumInput {
  @IsString()
  @IsNotEmpty()
  id: string;
}