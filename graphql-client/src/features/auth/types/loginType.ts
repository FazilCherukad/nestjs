import { ObjectType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { AuthUserType } from './authuser.type';

@ObjectType()
export class LoginType {
  @Field()
  accessToken: string;

  @Field({ nullable: true })
  expiry: string;

  @Field(() => AuthUserType)
  authUser: any;

  @Field({ nullable: true })
  customer_code: string;

  @Field({ nullable: true })
  executive_code: string;

  @Field({ nullable: true })
  workerSid: string;
}
