import { Field, InputType } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class UpdateExecutiveStatusDto {

  @Field()
  executiveCode: string;

  @Field()
  status: string;

}
