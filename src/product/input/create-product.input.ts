import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateProductInput {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string
}
