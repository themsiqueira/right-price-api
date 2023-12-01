import { ApiProperty } from '@nestjs/swagger'
import { IsDateString, IsNotEmpty, IsString } from 'class-validator'
export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly documentNumber: string

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  readonly birthDate: Date

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly passwordHash: string
}
