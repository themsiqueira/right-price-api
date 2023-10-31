import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateProductInput {
  @IsNotEmpty()
  @IsString()
  id: string

  @IsString()
  name: string
}
