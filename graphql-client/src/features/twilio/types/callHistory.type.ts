import { ObjectType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { AuthUserType } from '../../../features/auth/types/authuser.type';

@ObjectType()
export class CallHistoryType {

  @Field()
  id: string;

  @Field(()=>AuthUserType)
  customer: any;

  @Field(()=>AuthUserType)
  executive: any;

  @Field({nullable: true})
  call_duration: number;

  @Field()
  coins_used: number;

  @Field()
  free_coins_used: number;

  @Field({nullable: true})
  inbound_client: string;

  @Field({nullable: true})
  outbound_client: string;

  @Field({nullable: true})
  call_status: string;

  @Field({nullable: true})
  outbound_call_duration: string;

  @Field({nullable: true})
  outbound_call_sid: string;

  @Field({nullable: true})
  inbound_call_sid: string;

  @Field()
  updatedAt: string;

  @Field({nullable: true})
  rating: string;

  @Field(()=>GraphQLJSONObject, {nullable: true})
  message: string;

  @Field(()=>GraphQLJSONObject, {nullable: true})
  initial_executive_coin: string;

  @Field(()=>GraphQLJSONObject, {nullable: true})
  final_executive_coin: string;

  @Field(()=>GraphQLJSONObject, {nullable: true})
  initial_customer_coin: string;

  @Field(()=>GraphQLJSONObject, {nullable: true})
  final_customer_coin: string;

}
