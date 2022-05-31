// import { ObjectType, Field } from 'type-graphql';
// import { GraphQLJSONObject } from 'graphql-type-json';
// import { AuthUserType } from '../../../features/auth/types/authUser.type';
// import { BranchType } from '../../../features/company/types/branch.type';
// import { AreaType } from '../../../features/company/types/area.type';

// @ObjectType()
// export class IbapUserType {
//   @Field()
//   id: string;

//   @Field()
//   fId: string;

//   @Field(() => AuthUserType)
//   authUser: any;

//   @Field(() => GraphQLJSONObject, { nullable: true })
//   firstName_Ml: any;

//   @Field(() => GraphQLJSONObject, { nullable: true })
//   lastName_Ml: any;

//   @Field(() => AreaType, { nullable: true })
//   area: any;

//   @Field(() => BranchType, { nullable: true })
//   branch: any;

//   @Field(() => GraphQLJSONObject, { nullable: true })
//   role: any;

// }