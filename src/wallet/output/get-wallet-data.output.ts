import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class Coupon {
  @Field()
  readonly id: string;

  // Adicione outras propriedades do cupom aqui conforme necessário
}

@ObjectType()
export class GetWalletOutput {
  @Field()
  readonly id: string;

  @Field(() => [Coupon])
  readonly coupons: Coupon[];

  @Field()
  readonly deletedAt: Date;

  @Field()
  readonly createdAt: Date;

  @Field()
  readonly expiresAt: Date;
}