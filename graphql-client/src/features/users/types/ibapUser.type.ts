import { ObjectType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { AuthUserType } from '../../../features/auth/types/authuser.type';

@ObjectType()
export class IbapUserType {
  @Field()
  id: string;

  @Field()
  fId: string;

  @Field(() => AuthUserType)
  authUser: any;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  executive_code: string;

  @Field({ nullable: true })
  status: string;

  @Field(()=>GraphQLJSONObject,{ nullable: true })
  account_details: string;

  @Field({nullable: true})
  profession: string;

  @Field()
  account_type: string;

  @Field()
  call_cost: number;

  @Field({ nullable: true })
  free_coins: number;

  @Field({ nullable: true })
  premium_coins: number;

  @Field({ nullable: true })
  rating: number;
}