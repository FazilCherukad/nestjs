import { InputType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class UpdateUserWalletByAdminDto {
  @Field()
  customer: string;

  @Field()
  plan: string;

}
