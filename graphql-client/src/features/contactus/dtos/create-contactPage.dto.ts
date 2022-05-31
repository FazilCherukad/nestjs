import { InputType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateContactPageDto {
  @Field({nullable: true})
  id: string;

  @Field()
  type: string;

  @Field()
  userType: string;

  @Field(() => GraphQLJSONObject)
  message: any;
}
