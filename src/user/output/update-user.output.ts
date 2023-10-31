import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UpdateUserOutput {
  @Field()
  readonly id: string;

  @Field()
  readonly name: string;

  @Field()
  readonly email: string;

  @Field()
  readonly documentNumber: string;

  @Field()
  readonly birthDate: Date;
}