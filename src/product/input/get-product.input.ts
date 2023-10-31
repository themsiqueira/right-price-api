import { IsNotEmpty, IsString } from 'class-validator'

export class GetProductInput {
  @IsNotEmpty()
  @IsString()
  id: string
}
