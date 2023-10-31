import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateEmporiumInput {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  address: string

  @IsString()
  @IsOptional()
  userId?: string
}
