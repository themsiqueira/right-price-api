import { Expose } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateEmporiumOutput {
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
  expiresAt: Date
}
