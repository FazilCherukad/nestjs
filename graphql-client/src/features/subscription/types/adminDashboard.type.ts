import { ObjectType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class AdminDashboardType {

  @Field()
  totalSales: number;

  @Field()
  totalCalls: number;


}
