import { InputType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class UpdateCallRatingDto {
  @Field()
  id: string;

  @Field()
  rating: number;


}
