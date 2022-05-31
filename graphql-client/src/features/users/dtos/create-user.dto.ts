import { InputType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateUserDto {
  @Field()
  fId: string;

  @Field(() => String)
  area: any;

  @Field()
  gender: string;

  @Field()
  firstName: string;

  @Field()
  address: string;

  @Field()
  lastName: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  mobile: string;

  @Field()
  password: string;

  @Field()
  isActive: boolean;

  // @Field()
  // image: string;

  // @Field(()=> String)
  // branch:any;
}
