import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEmporiumOutput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  id: string; 
}