import { InputType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateFreePlanDto {

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field()
  total_coins: number;

  @Field({nullable: true})
  start_from: Date;

  @Field({nullable: true})
  end_to: Date;

  @Field({nullable: true})
  number_of_days: number;

  @Field({nullable: true})
  max_coin_per_day: number;

  @Field()
  user_level: string;

}
