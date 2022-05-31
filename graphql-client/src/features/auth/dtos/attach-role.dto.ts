import { InputType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class AttachRoleDto {
  @Field()
  id: string;

  @Field(() => [String])
  roles: Array<string>;
}
