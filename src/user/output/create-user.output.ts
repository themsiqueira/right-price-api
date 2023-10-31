import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CreateUserOutput {
  @Field()
  readonly name: string;

  @Field()
  readonly email: string;
}