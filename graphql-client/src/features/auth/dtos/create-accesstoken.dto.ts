import { InputType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { AuthUserType } from '../types/authuser.type';

@InputType()
export class CreateAccessTokenDto {
  @Field()
  token: string;

  @Field()
  expiry: Date;

  @Field()
  isRevoked: boolean;

  @Field()
  authUser: string;

  @Field()
  client: string;
}
