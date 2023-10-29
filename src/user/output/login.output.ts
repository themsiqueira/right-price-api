import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LoginOutput {
  @Field()
  readonly accessToken: string; // ATENÇÃO, ALTERAR CONFORME O CÓDIGO DE AUTENTIFICAÇÃO E TOKENS 

  @Field()
  readonly refreshToken: string; // ATENÇÃO, ALTERAR CONFORME O CÓDIGO DE AUTENTIFICAÇÃO E TOKENS 
}
