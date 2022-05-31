import { InputType, Field } from "type-graphql";
import { GraphQLJSONObject } from 'graphql-type-json';


@InputType()
export class UpdateIbapUserLogDto {

  @Field()
  id: string;

  @Field({ nullable: true })
  action: string;

  @Field({ nullable: true })
  entity: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  oldValue: any;

  @Field(() => GraphQLJSONObject, { nullable: true })
  newValue: any;

}

