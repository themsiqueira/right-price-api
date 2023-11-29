import { IsDate, IsNotEmpty, IsString } from 'class-validator'

export class UpdateUserInput {
  @IsString()
  @IsNotEmpty()
  readonly userId: string

  @IsString()
  readonly name?: string

  @IsString()
  readonly email?: string

  @IsDate()
  readonly birthDate?: Date
}
