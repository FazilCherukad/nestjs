import { InputType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class UpdateSubscriptionPlanDto {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  price: number;

  @Field()
  gst: number;

  @Field()
  number_of_coins: number;

}
