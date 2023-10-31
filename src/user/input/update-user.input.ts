import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field()
  readonly userId: string;

  @Field({ nullable: true })
  readonly name?: string;

  @Field({ nullable: true })
  readonly email?: string;

  @Field({ nullable: true })
  readonly documentNumber?: string;

  @Field({ nullable: true })
  readonly birthDate?: Date;
}