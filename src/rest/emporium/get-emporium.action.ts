import { Injectable } from '@nestjs/common'

@Injectable()
export class GetEmporium {
  handle(input: GetEmporiumInput): Promise<GetEmporiumOutput> {}
}
