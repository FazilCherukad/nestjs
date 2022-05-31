import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateAppUserPasswordDto {

  @Field()
  code: string;

  @Field()
  mobileNo: string;

  @Field()
  password: string;

}