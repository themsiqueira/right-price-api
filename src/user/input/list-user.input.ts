import { IsNumber, IsString } from 'class-validator'

export class ListUserInput {
  @IsString()
  name?: string

  @IsNumber()
  limit?: number

  @IsNumber()
  page?: number
}
