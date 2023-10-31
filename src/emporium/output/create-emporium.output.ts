import { IsNotEmpty, IsString } from 'class-validator'

export class CreateEmporiumOutput {
  @IsString()
  @IsNotEmpty()
  id: string

  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  address: string
}
