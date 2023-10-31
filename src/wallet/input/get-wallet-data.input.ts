import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class GetWalletInput {
  @Field()
  readonly userId: string;
}