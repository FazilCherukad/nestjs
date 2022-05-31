import { ObjectType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class AppVersionType {

  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  updation: boolean;

  @Field()
  message: string;

  @Field()
  version: number;

  @Field({nullable: true})
  url: string;

}
