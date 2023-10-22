import { Injectable } from '@nestjs/common'

@Injectable()
export class DeleteEmporium {
  handle(input: DeleteEmporiumInput): Promise<DeleteEmporiumOutput> {}
}
