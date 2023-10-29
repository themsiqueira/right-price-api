import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProductOutput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  id: string; 
}