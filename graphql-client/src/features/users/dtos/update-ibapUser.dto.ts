import { Field, InputType } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class UpdateIbapUserDto {

  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  username: string;

  @Field({ nullable: true })
  email: string;

  @Field()
  mobile: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  isActive: boolean;

  @Field()
  status: string;

  @Field({nullable: true})
  profession: string;

  @Field()
  account_type: string;

  @Field()
  call_cost: number;

  @Field(() => GraphQLJSONObject, { nullable: true })
  account_details: any;

}
