import { IsNotEmpty, IsString } from 'class-validator'

export class DeleteEmporiumInput {
  @IsString()
  @IsNotEmpty()
  id: string
}
