import { IsNotEmpty, IsString } from 'class-validator'

export class DeleteProductInput {
  @IsString()
  @IsNotEmpty()
  id: string
}
