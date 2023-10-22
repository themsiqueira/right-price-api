import { Injectable } from '@nestjs/common'

@Injectable()
export class UpdateEmporium {
  handle(input: UpdateEmporiumInput): Promise<UpdateEmporiumOutput> {}
}
