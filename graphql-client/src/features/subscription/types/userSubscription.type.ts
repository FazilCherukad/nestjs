import { ObjectType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { AuthUserType } from '../../../features/auth/types/authuser.type';
import { SubscriptionPlanType } from './subscriptionPlan.type';

@ObjectType()
export class UserSubscriptionType {

  @Field()
  fId: string;

  @Field()
  id: string;

  @Field(()=>AuthUserType)
  authUser: any;

  @Field()
  order_id: string;

  @Field(()=>SubscriptionPlanType)
  plan: any;

  @Field({nullable: true})
  transaction_url: string;

  @Field({nullable: true})
  transaction_id: string;

  @Field({nullable: true})
  payment_method: string;

  @Field({nullable: true})
  price: number;

  @Field({nullable: true})
  payed_amount: number;

  @Field({nullable: true})
  payment_status: string;

  @Field(()=>GraphQLJSONObject, {nullable: true})
  response_object: any;

  @Field()
  updatedAt: string;
  
}

