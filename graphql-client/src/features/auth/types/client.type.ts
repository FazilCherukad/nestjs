import { ObjectType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class ClientType {
  @Field()
  id: string;

  @Field()
  fId: string;

  @Field()
  name: string;

  @Field()
  secret: string;

  @Field()
  isActive: boolean;
}
