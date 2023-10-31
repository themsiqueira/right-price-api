import { ApiProperty } from '@nestjs/swagger'
import { Expose } from 'class-transformer'

import { GetEmporiumOutput } from '@app/emporium/output/get-emporium.output'

export class ListEmporiumOutput {
  @Expose()
  @ApiProperty()
  total: number

  @Expose()
  @ApiProperty()
  page: number

  @Expose()
  @ApiProperty()
  data: Array<GetEmporiumOutput>
}
