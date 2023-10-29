import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  readonly email: string;

  @Field()
  readonly password: string;
}