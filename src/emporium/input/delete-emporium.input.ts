import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteEmporiumInput {
  @IsNumber()
  @IsNotEmpty()
  id: number;
}