import { Injectable } from '@nestjs/common'

@Injectable()
export class ListEmporium {
  handle(input: ListEmporiumInput): Promise<ListEmporiumOutput> {}
}
