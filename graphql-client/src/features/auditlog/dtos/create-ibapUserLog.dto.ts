import { InputType, Field } from "type-graphql";
import { GraphQLJSONObject } from 'graphql-type-json';


@InputType()
export class CreateIbapUserLogDto {

  

  @Field()
  action: string;

  @Field()
  entity: string;

  @Field(() => GraphQLJSONObject, { nullable: true })
  oldValue: any;

  @Field(() => GraphQLJSONObject, { nullable: true })
  newValue: any;

}

