import { Field, InputType } from 'type-graphql';

@InputType()
export class LoginAppUserDto {
  @Field()
  username: string;

  @Field()
  code: string;

  @Field()
  clientName: string;

  @Field()
  clientSecret: string;
}
