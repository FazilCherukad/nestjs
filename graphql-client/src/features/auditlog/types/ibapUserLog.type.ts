import { ObjectType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { IbapUserType } from '../../../features/users/types/ibapUser.type';
import { AuthUserType } from '../../../features/auth/types/authuser.type';

@ObjectType()
export class IbapUserLogType {

  @Field()
  id: string;

  @Field()
  action: string;

  @Field()
  createdAt: string;

  @Field()
  updatedAt: string;

  @Field({ nullable: true })
  entity: string;

  @Field(() => AuthUserType, { nullable: true })
  authUser: any;

  @Field(() => GraphQLJSONObject, { nullable: true })
  oldValue: any;

  @Field(() => GraphQLJSONObject, { nullable: true })
  newValue: any;



}