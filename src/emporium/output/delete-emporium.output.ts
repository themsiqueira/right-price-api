import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class DeleteEmporiumOutput {
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
  