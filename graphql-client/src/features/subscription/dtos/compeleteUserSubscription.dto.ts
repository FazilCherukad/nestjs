import { InputType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CompeleteUserSubscriptionDto {
  @Field()
  transaction_id: string;

  @Field()
  payment_id: string;

  @Field()
  payment_signature: string;

}
