import { InputType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class UpdatePasswordDto {
  @Field()
  id: string;

  @Field()
  password: string;
}
