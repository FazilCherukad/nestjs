import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginExecutiveUserDto {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field()
  clientName: string;

  @Field()
  clientSecret: string;
}
