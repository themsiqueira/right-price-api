import { ApiProperty } from '@nestjs/swagger'
import { IsDate, IsNotEmpty } from 'class-validator'
import { IsString } from 'class-validator/types/decorator/typechecker/IsString'

export class CreateUserInput {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly documentNumber: string

  @IsDate()
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
  readonly password: string
}
