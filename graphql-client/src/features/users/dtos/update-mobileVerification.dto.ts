import { InputType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class UpdateMobileVerificationDto {
  @Field()
  id: string;

  @Field({ nullable: true })
  mobileNo: string;

  @Field({ nullable: true })
  email: string;
}
