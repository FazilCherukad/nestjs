// import { Resolver, Mutation, Args } from '@nestjs/graphql';
// import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
// import { RPCServices } from 'ibap-common/dist/services/rpc-services';
// import { Users } from 'ibap-common/dist/services/users/services';
// import { Int } from 'type-graphql';
// import { GraphQLJSONObject } from 'graphql-type-json';
// import { DeleteDto } from '../../../common/dtos/delete.dto';
// import { GraphQLError } from 'graphql';

// import { MobileVerificationType } from '../types/mobileVerification.type';
// import { CreateMobileVerificationDto } from '../dtos/create-mobileVerification.dto';
// import { UpdateMobileVerificationDto } from '../dtos/update-mobileVerification.dto';
// import { UseGuards } from '@nestjs/common';
// import { GqlAuthGuard } from '../../../common/authentication/guards/gql-auth.guard';
// import { TokenUser } from '../../../common/authentication/decorators/tokenUser.decorator';
// import { ACRoles } from '../../../common/access-controll/decorators/ac-roles.decorator';

// import { AttachStationDto } from '../dtos/attach-station.dto';
// import { DeleteSuperVisorDto } from '../dtos/delete-supervisor.dto';

// import { DeviceLocationType } from '../types/deviceLocation.type';
// import { CreateDeviceLocationDto } from '../dtos/create-deviceLocation.dto';
// import { UpdateDeviceLocationDto } from '../dtos/update-deviceLocation.dto';
// import { UpsertDeviceDto } from '../dtos/upsert-device.dto';
// import { DeviceType } from '../types/device.type';
// import { UpdateUserPasswordDto } from '../dtos/update-user-password.dto';
// import { AuthUserType } from '../../../features/auth/types/authUser.type';

// import { AppUserType } from '../types/appUser.type';
// import { CreateAppUserDto } from '../dtos/create-appUser.dto';
// import { UpdateAppUserDto } from '../dtos/update-appUser.dto';
// import { IbapUserType } from '../types/ibapUser.type';
// import { UpdateIbapUserDto } from '../dtos/update-ibapUser.dto';
// import { CreateIbapUserDto } from '../dtos/create-ibapUser.dto';
// import { CreateDeviceDto } from '../dtos/create-device.dto';

// @Resolver()
// export class CommandResolver {
//   constructor(private readonly nats: NatsClientService) { }

//   // Message_Patterns

//   // -------------------------  AppUser ------------------------------------------ //

//   @Mutation(returns => AppUserType)
//   async createAppUser(@Args('data') data: CreateAppUserDto) {
//     return await this.nats
//       .sendSync(RPCServices.Users, Users.CreateAppUserCommand, data)
//       .catch(e => {
//         console.log(e);
//         throw new GraphQLError(e.message);
//       });
//   }

//   //@ACRoles(['Admin', 'SuperAdmin'])
//   @Mutation(returns => AppUserType)
//   async updateAppUser(@Args('data') data: UpdateAppUserDto) {
//     return await this.nats
//       .sendSync(RPCServices.Users, Users.UpdateAppUserCommand, data)
//       .catch(e => {
//         throw new GraphQLError(e.message);
//       });
//   }

//   //@ACRoles(['Admin', 'SuperAdmin'])
//   @Mutation(returns => AppUserType)
//   async deleteAppUser(@Args('data') data: DeleteDto) {
//     return await this.nats
//       .sendSync(RPCServices.Users, Users.DeleteAppUserCommand, data)
//       .catch(e => {
//         throw new GraphQLError(e.message);
//       });
//   }

//   // -------------------------  IbapUser ------------------------------------------ //

//   @Mutation(returns => AppUserType)
//   async createIbapUser(@Args('data') data: CreateIbapUserDto) {
//     return await this.nats
//       .sendSync(RPCServices.Users, Users.CreateIbapUserCommand, data)
//       .catch(e => {
//         console.log(e);
//         throw new GraphQLError(e.message);
//       });
//   }

//   //@ACRoles(['Admin', 'SuperAdmin'])
//   @Mutation(returns => IbapUserType)
//   async updateIbapUser(@Args('data') data: UpdateIbapUserDto) {
//     return await this.nats
//       .sendSync(RPCServices.Users, Users.UpdateIbapUserCommand, data)
//       .catch(e => {
//         throw new GraphQLError(e.message);
//       });
//   }

//   //@ACRoles(['Admin', 'SuperAdmin'])
//   @Mutation(returns => IbapUserType)
//   async deleteIbapUser(@Args('data') data: DeleteDto) {
//     return await this.nats
//       .sendSync(RPCServices.Users, Users.DeleteIbapUserCommand, data)
//       .catch(e => {
//         throw new GraphQLError(e.message);
//       });
//   }

//   // -------------------------  password ------------------------------------------ //
//   // @Mutation(returns => AuthUserType)
//   // async updateUserPassword(@Args('data') data: UpdateUserPasswordDto) {
//   //   return await this.nats.sendSync(RPCServices.Users, Users.UpdateUserPasswordCommand, data)
//   //     .catch((e) => {
//   //       throw new GraphQLError(e.message)
//   //     });
//   // }


//   // // -------------------------  DeviceLocation ------------------------------------------ //

//   @Mutation(returns => DeviceLocationType)
//   async createDeviceLocation(@Args('data') data: CreateDeviceLocationDto) {
//     let d = await this.nats.sendSync(RPCServices.Users, Users.CreateDeviceLocationCommand, data).
//       catch((e) => {
//         console.log("........", e)
//         throw new GraphQLError(e.message)
//       });
//     return d;
//   }

//   @Mutation(returns => DeviceLocationType)
//   async updateDeviceLocation(@Args('data') data: UpdateDeviceLocationDto) {
//     return await this.nats.sendSync(RPCServices.Users, Users.UpdateDeviceLocationCommand, data).catch((e) => { throw new GraphQLError(e.message) });
//   }

//   @Mutation(returns => DeviceLocationType)
//   async deleteDeviceLocation(@Args('data') data: DeleteDto) {
//     return await this.nats.sendSync(RPCServices.Users, Users.DeleteDeviceLocationCommand, data).catch((e) => { throw new GraphQLError(e.message) });
//   }

//   // // -------------------------  Device ------------------------------------------ //

//   @Mutation(returns => DeviceType)
//   async createDevice(@Args('data') data: CreateDeviceDto) {
//     return await this.nats.sendSync(RPCServices.Users, Users.CreateDeviceCommand, data).catch((e) => { throw new GraphQLError(e) });
//   }

//   @UseGuards(new GqlAuthGuard)
//   @Mutation(returns => DeviceType)
//   async upsertDevice(@Args('data') data: UpsertDeviceDto, @TokenUser() user: any) {
//     let d = await this.nats.sendSync(RPCServices.Users, Users.UpdateDeviceCommand,
//       { dto: data, tokenUser: user }
//     ).
//       catch((e) => {
//         throw new GraphQLError(e.message)
//       });
//     return d;
//   }

//   @Mutation(returns => DeviceType)
//   async deleteDevice(@Args('data') data: DeleteDto) {
//     return await this.nats.sendSync(RPCServices.Users, Users.DeleteDeviceCommand, data).catch((e) => { throw new GraphQLError(e.message) });
//   }


//   // //@ACRoles(["SuperAdmin","Admin"])
//   // @Mutation(returns => SupervisorType)
//   // async attachStationToSupervisor(@Args('data') data: AttachStationDto) {
//   //   return await this.nats.sendSync(RPCServices.Users, Users.AttachStationCommand, data).catch(e => {
//   //     throw new GraphQLError(e.message);
//   //   });
//   // }

//   // // -------------------------  MobileVerification ------------------------------------------ //

//   // //@ACRoles(['Admin', 'SuperAdmin', 'Guest'])
//   @Mutation(returns => MobileVerificationType)
//   async createMobileVerification(
//     @Args('data') data: CreateMobileVerificationDto,
//   ) {
//     return await this.nats
//       .sendSync(RPCServices.Users, Users.CreateMobileVerificationCommand, data)
//       .catch(e => {
//         // let message;
//         // switch(e.message){
//         //   case 'user_not_found': message = 'User Not Found'; break;
//         //   default:message = 'Interal Server Error';
//         // }
//         //  for custom error config
//         throw new GraphQLError(e.message);
//       });
//   }

//   //@ACRoles(['Admin', 'SuperAdmin', 'Guest'])
//   @Mutation(returns => MobileVerificationType)
//   async updateMobileVerification(
//     @Args('data') data: UpdateMobileVerificationDto,
//   ) {
//     return await this.nats
//       .sendSync(RPCServices.Users, Users.UpdateMobileVerificationCommand, data)
//       .catch(e => {
//         throw new GraphQLError(e.message);
//       });
//   }

//   //@ACRoles(['Admin', 'SuperAdmin', 'Guest'])
//   @Mutation(returns => MobileVerificationType)
//   async deleteMobileVerification(@Args('data') data: DeleteDto) {
//     return await this.nats
//       .sendSync(RPCServices.Users, Users.DeleteMobileVerificationCommand, data)
//       .catch(e => {
//         throw new GraphQLError(e.message);
//       });
//   }
// }
