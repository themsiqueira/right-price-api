import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateEmporiumOutput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  id: number; 
}