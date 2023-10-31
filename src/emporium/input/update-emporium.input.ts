import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, IsOptional } from 'class-validator'

export class UpdateEmporiumInput {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  id: string

  @IsString()
  @ApiProperty()
  @IsOptional()
  name: string

  @IsString()
  @ApiProperty()
  @IsOptional()
  address: string
}
