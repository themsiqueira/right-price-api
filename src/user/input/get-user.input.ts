import { IsNotEmpty, IsString } from 'class-validator'

export class GetUserInput {
  @IsString()
  @IsNotEmpty()
  readonly id: string
}
