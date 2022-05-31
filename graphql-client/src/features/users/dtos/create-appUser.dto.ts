import {  Field, InputType } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { AuthUserType } from '../../../features/auth/types/authuser.type';

@InputType()
export class CreateAppUserDto {

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  username: string;

  @Field({nullable: true})
  email: string;

  @Field()
  mobile: string;

  @Field({nullable: true})
  password: string;

  @Field({ nullable: true })
  isActive: boolean;

  // @Field({ nullable: true })
  // image: string;

  @Field({ nullable: true })
  gender: string;


}
