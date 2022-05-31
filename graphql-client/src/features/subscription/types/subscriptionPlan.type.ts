import { ObjectType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class SubscriptionPlanType {

    @Field()
    id: string;

    @Field()
    fId: string;
  
    @Field()
    name: string;
  
    @Field({ nullable: true })
    description: string;
  
    @Field()
    price: number;

    @Field({ nullable: true })
    gst: number;
  
    @Field()
    number_of_coins: number;

}
