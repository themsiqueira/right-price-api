import { IsNotEmpty, IsString } from 'class-validator'

export class DeleteUserInput {
  @IsString()
  @IsNotEmpty()
  readonly id: string
}
