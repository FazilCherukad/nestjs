// import { Resolver, Args, Query } from '@nestjs/graphql';
// import { Int } from 'type-graphql';
// import { GraphQLJSONObject } from 'graphql-type-json';
// import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
// import { GqlFieldsMap } from 'ibap-common/dist/common/decorators/gql-fields-map.decorator';
// import { GqlProjection } from 'ibap-common/dist/common/decorators/gql-projection.decorator';
// import { RPCServices } from 'ibap-common/dist/services/rpc-services';
// import { Users } from 'ibap-common/dist/services/users/services';
// import { GraphQLError } from 'graphql';
// import { AppUserType } from '../types/appUser.type';
// import { IbapUserType } from '../types/ibapUser.type';



// import { MobileVerificationType } from '../types/mobileVerification.type';
// import { ACRoles } from '../../../common/access-controll/decorators/ac-roles.decorator';

// import { DeviceType } from '../types/device.type';
// import { DeviceLocationType } from '../types/deviceLocation.type';
// ';

// @Resolver()
// export class QueryResolver {
//   constructor(private readonly nats: NatsClientService) { }

//   //   // Message_Patterns
//   // ...............................appUser....................................//

//   @Query(returns => AppUserType, { nullable: true })
//   async GetOneAppUser(
//     @GqlFieldsMap() fieldsMap: any,
//     @GqlProjection() projection,
//     @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
//     condition: any,
//   ) {
//     return await this.nats
//       .sendSync(RPCServices.Users, Users.GetOneAppUserQuery, {
//         condition: condition,
//         fieldsMap: fieldsMap,
//       })
//       .catch(e => {
//         throw new GraphQLError(e.message);
//       });
//   }

//   //@ACRoles([ 'User','Admin', 'SuperAdmin'])
//   @Query(returns => [AppUserType])
//   async GetManyAppUser(
//     @GqlFieldsMap() fieldsMap: any,
//     @GqlProjection() projection,
//     @Args({ name: 'limit', nullable: true, type: () => Int }) limit: number,
//     @Args({ name: 'skip', nullable: true, type: () => Int }) skip: number,
//     @Args({ name: 'sort', nullable: true, type: () => String }) sort: string,
//     @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
//     condition: any,
//   ) {
//     return await this.nats
//       .sendSync(RPCServices.Users, Users.GetManyAppUserQuery, {
//         limit: limit,
//         skip: skip,
//         sort: sort,
//         condition: condition,
//         fieldsMap: fieldsMap,
//       })
//       .catch(e => {
//         throw new GraphQLError(e.message);
//       });
//   }

//   @Query(returns => String, { nullable: true })
//   async GetAppUserCount(
//     @GqlFieldsMap() fieldsMap: any,
//     @GqlProjection() projection,
//     @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
//     condition: any,
//   ) {
//     return await this.nats
//       .sendSync(RPCServices.Users, Users.GetAppUserCountQuery, {
//         // limit: limit,
//         // skip: skip,
//         // sort: sort,
//         condition: condition,
//         fieldsMap: fieldsMap,
//       })
//       .catch(e => {
//         throw new GraphQLError(e.message);
//       });
//   }
//   // ...............................ibapUser....................................//

//   @Query(returns => IbapUserType, { nullable: true })
//   async GetOneIbapUser(
//     @GqlFieldsMap() fieldsMap: any,
//     @GqlProjection() projection,
//     @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
//     condition: any,
//   ) {
//     return await this.nats
//       .sendSync(RPCServices.Users, Users.GetOneIbapUserQuery, {
//         condition: condition,
//         fieldsMap: fieldsMap,
//       })
//       .catch(e => {
//         throw new GraphQLError(e.message);
//       });
//   }

//   //@ACRoles([ 'User','Admin', 'SuperAdmin'])
//   @Query(returns => [IbapUserType])
//   async GetManyIbapUser(
//     @GqlFieldsMap() fieldsMap: any,
//     @GqlProjection() projection,
//     @Args({ name: 'limit', nullable: true, type: () => Int }) limit: number,
//     @Args({ name: 'skip', nullable: true, type: () => Int }) skip: number,
//     @Args({ name: 'sort', nullable: true, type: () => String }) sort: string,
//     @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
//     condition: any,
//   ) {
//     return await this.nats
//       .sendSync(RPCServices.Users, Users.GetManyIbapUserQuery, {
//         limit: limit,
//         skip: skip,
//         sort: sort,
//         condition: condition,
//         fieldsMap: fieldsMap,
//       })
//       .catch(e => {
//         throw new GraphQLError(e.message);
//       });
//   }

//   @Query(returns => String, { nullable: true })
//   async GetIbapUserCount(
//     @GqlFieldsMap() fieldsMap: any,
//     @GqlProjection() projection,
//     @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
//     condition: any,
//   ) {
//     return await this.nats
//       .sendSync(RPCServices.Users, Users.GetIbapUserCountQuery, {
//         // limit: limit,
//         // skip: skip,
//         // sort: sort,
//         condition: condition,
//         fieldsMap: fieldsMap,
//       })
//       .catch(e => {
//         throw new GraphQLError(e.message);
//       });
//   }


//   // -------------------------  DeviceLocation ------------------------------------------ //

//   @Query(returns => DeviceLocationType, { nullable: true })
//   async getOneDeviceLocation(
//     @GqlFieldsMap() fieldsMap: any,
//     @GqlProjection() projection,
//     @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject }) condition: any
//   ) {
//     return await this.nats.sendSync(RPCServices.Users, Users.GetOneDeviceLocationQuery, {
//       condition: condition,
//       fieldsMap: fieldsMap
//     }).catch((e) => { throw new GraphQLError(e.message) });
//   }

//   @Query(returns => [DeviceLocationType])
//   async getManyDeviceLocations(
//     @GqlFieldsMap() fieldsMap: any,
//     @GqlProjection() projection,
//     @Args({ name: 'limit', nullable: true, type: () => Int }) limit: number,
//     @Args({ name: 'skip', nullable: true, type: () => Int }) skip: number,
//     @Args({ name: 'sort', nullable: true, type: () => String }) sort: string,
//     @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject }) condition: any
//   ) {
//     return await this.nats.sendSync(RPCServices.Users, Users.GetManyDeviceLocationQuery, {
//       limit: limit,
//       skip: skip,
//       sort: sort,
//       condition: condition,
//       fieldsMap: fieldsMap
//     }).catch((e) => { throw new GraphQLError(e.message) });
//   }





//   // -------------------------  Device ------------------------------------------ //

//   @Query(returns => DeviceType, { nullable: true })
//   async getOneDevice(
//     @GqlFieldsMap() fieldsMap: any,
//     @GqlProjection() projection,
//     @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject }) condition: any
//   ) {
//     return await this.nats.sendSync(RPCServices.Users, Users.GetOneDeviceQuery, {
//       condition: condition,
//       fieldsMap: fieldsMap
//     }).catch((e) => { throw new GraphQLError(e.message) });
//   }

//   @Query(returns => [DeviceType])
//   async getManyDevices(
//     @GqlFieldsMap() fieldsMap: any,
//     @GqlProjection() projection,
//     @Args({ name: 'limit', nullable: true, type: () => Int }) limit: number,
//     @Args({ name: 'skip', nullable: true, type: () => Int }) skip: number,
//     @Args({ name: 'sort', nullable: true, type: () => String }) sort: string,
//     @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject }) condition: any
//   ) {
//     return await this.nats.sendSync(RPCServices.Users, Users.GetManyDevicesQuery, {
//       limit: limit,
//       skip: skip,
//       sort: sort,
//       condition: condition,
//       fieldsMap: fieldsMap
//     }).catch((e) => { throw new GraphQLError(e.message) });
//   }


//   // -------------------------  MobileVerification ------------------------------------------ //

//   //@ACRoles(['Guest', 'Admin', 'SuperAdmin'])
//   @Query(returns => MobileVerificationType, { nullable: true })
//   async getOneMobileVerification(
//     @GqlFieldsMap() fieldsMap: any,
//     @GqlProjection() projection,
//     @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
//     condition: any,
//   ) {
//     return await this.nats
//       .sendSync(RPCServices.Users, Users.GetOneMobileVerificationQuery, {
//         condition: condition,
//         fieldsMap: fieldsMap,
//       })
//       .catch(e => {
//         throw new GraphQLError(e.message);
//       });
//   }

//   //@ACRoles(['Admin', 'SuperAdmin'])
//   @Query(returns => [MobileVerificationType])
//   async getManyMobileVerifications(
//     @GqlFieldsMap() fieldsMap: any,
//     @GqlProjection() projection,
//     @Args({ name: 'limit', nullable: true, type: () => Int }) limit: number,
//     @Args({ name: 'skip', nullable: true, type: () => Int }) skip: number,
//     @Args({ name: 'sort', nullable: true, type: () => String }) sort: string,
//     @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
//     condition: any,
//   ) {
//     return await this.nats
//       .sendSync(RPCServices.Users, Users.GetManyMobileVerificationsQuery, {
//         limit: limit,
//         skip: skip,
//         sort: sort,
//         condition: condition,
//         fieldsMap: fieldsMap,
//       })
//       .catch(e => {
//         throw new GraphQLError(e.message);
//       });
//   }

// }
