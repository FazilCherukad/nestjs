import { ObjectType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { AuthUserType } from '../../../features/auth/types/authuser.type';

@ObjectType()
export class AppUserType {
  @Field()
  id: string;

  @Field()
  fId: string;

  @Field(() => AuthUserType)
  authUser: any;

  @Field()
  createdAt: string;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  customer_code: string;

  @Field({ nullable: true })
  gender: string;

}
