import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

export class GetEmporiumOutput {
  @Expose()
  @ApiProperty()
  id: string

  @Expose()
  @ApiProperty()
  name: string

  @Expose()
  @ApiProperty()
  address: string

  @Expose()
  @ApiProperty()
  createdAt: Date

  @Expose()
  @ApiProperty()
  updatedAt: Date
}
