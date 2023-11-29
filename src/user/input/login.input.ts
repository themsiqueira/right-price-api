import { IsNotEmpty, IsString } from 'class-validator'

export class LoginInput {
  @IsString()
  @IsNotEmpty()
  readonly email: string

  @IsString()
  @IsNotEmpty()
  readonly password: string
}
