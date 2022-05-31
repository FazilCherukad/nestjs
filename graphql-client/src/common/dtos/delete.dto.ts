import { IsMongoId } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class DeleteDto {
  @Field(() => String)
  @IsMongoId()
  id: string;
}
