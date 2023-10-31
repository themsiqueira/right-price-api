import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsNumber, IsString } from 'class-validator'

export class ListEmporiumInput {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name?: string

  @IsOptional()
  @IsString()
  @ApiProperty()
  address?: string

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  page?: number

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  limit?: number
}
