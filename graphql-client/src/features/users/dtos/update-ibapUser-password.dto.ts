import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateIbapUserPasswordDto {

  @Field()
  code: string;

  @Field()
  mobileNo: string;

  @Field()
  password: string;

}