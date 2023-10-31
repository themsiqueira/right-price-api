import { IsString, IsNotEmpty } from 'class-validator'

export class GetEmporiumInput {
  @IsString()
  @IsNotEmpty()
  id: string
}
