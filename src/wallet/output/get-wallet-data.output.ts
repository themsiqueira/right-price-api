export class CouponsOutput {
  id: string
  code: string
}

export class GetWalletDataOutput {
  coupons: Array<CouponsOutput>
}
