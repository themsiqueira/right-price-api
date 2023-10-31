import { GetUserOutput } from '@app/user/output/get-user.output'

export class ListUserOutput {
  total: number
  page: number
  data: Array<GetUserOutput>
}
