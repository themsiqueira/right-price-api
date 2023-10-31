import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  readonly name: string;

  @Field()
  readonly documentNumber: string;

  @Field()
  readonly birthDate: Date;

  @Field()
  readonly email: string;

  @Field()
  readonly password: string;
}