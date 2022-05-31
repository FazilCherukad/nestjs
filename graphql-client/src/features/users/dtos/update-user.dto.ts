import { InputType, Field } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class UpdateUserDto {
  
  @Field()
  id: string;

  
  @Field(() => String, { nullable: true })
  area: any;

  @Field({ nullable: true })
  gender: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  mobile: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  isActive: boolean;

  // @Field({ nullable: true })
  // image: string;

  @Field(() => String, { nullable: true })
  branch: any;
}
