import { ObjectType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class CoinType {

    @Field()
    free_coins: number;

    @Field()
    plan_coins: number;

    @Field()
    total_coins: number;

}
