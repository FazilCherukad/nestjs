import { ObjectType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class CallHistoryLogType {

  @Field()
  customer: string;

  @Field()
  executive: string;

  @Field(()=>GraphQLJSONObject, {nullable: true})
  event_data: any;

  @Field()
  createdAt: string;

}