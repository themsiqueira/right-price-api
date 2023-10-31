import { IsOptional, IsNumber, IsString } from 'class-validator'

export class ListProductInput {
  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsNumber()
  page?: number

  @IsOptional()
  @IsNumber()
  limit?: number
}
