import { ObjectType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@ObjectType()
export class ContactPageType {

  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  userType: string;

  @Field(() => GraphQLJSONObject)
  message: any;

}
