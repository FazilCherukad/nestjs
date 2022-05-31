
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
import { RPCServices } from 'ibap-common/dist/services/rpc-services';
import { Users } from 'ibap-common/dist/services/users/services';
import { Int } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { DeleteDto } from '../../../common/dtos/delete.dto';
import { GraphQLError } from 'graphql';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

import { MobileVerificationType } from '../types/mobileVerification.type';
import { CreateMobileVerificationDto } from '../dtos/create-mobileVerification.dto';
import { UpdateMobileVerificationDto } from '../dtos/update-mobileVerification.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../../common/authentication/guards/gql-auth.guard';
import { TokenUser } from '../../../common/authentication/decorators/tokenUser.decorator';
import { ACRoles } from '../../../common/access-controll/decorators/ac-roles.decorator';
import { UpsertDeviceDto } from '../dtos/upsert-device.dto';
import { UpdateIbapUserPasswordDto } from '../dtos/update-ibapUser-password.dto';
import { AuthUserType } from '../../../features/auth/types/authuser.type';
import { AppUserType } from '../types/appUser.type';
import { CreateAppUserDto } from '../dtos/create-appUser.dto';
import { UpdateAppUserDto } from '../dtos/update-appUser.dto';
import { IbapUserType } from '../types/ibapUser.type';
import { UpdateIbapUserDto } from '../dtos/update-ibapUser.dto';
import { CreateIbapUserDto } from '../dtos/create-ibapUser.dto';
import { UpdateAppUserPasswordDto } from '../dtos/update-appUser-password.dto';
import { LoginType } from 'src/features/auth/types/loginType';
import { LoginAppUserDto } from '../dtos/login-appUser.dto';
import { LoginExecutiveUserDto } from '../dtos/login-executiveUser.dto';
import { UpdateExecutiveStatusDto } from '../dtos/update-executive-status.dto';
// import { TokenUser } from '../../../common/authentication/decorators/tokenUser.decorator';

@Resolver()
export class CommandResolver {
  constructor(private readonly nats: NatsClientService) { }

  // Message_Patterns


  // -------------------------  AppUser ------------------------------------------ //

  @Mutation(returns => LoginType, { nullable: true })
  async loginAppUser(@Args('data') data: LoginAppUserDto) {
    return await this.nats
      .sendSync(RPCServices.Users, Users.AppUserLoginCommand, data)
      .catch(e => {
        console.log(e)
        throw new GraphQLError(e.message)
      });
  }

  @Mutation(returns => AppUserType)
  async createAppUser(@Args('data') data: CreateAppUserDto) {
    return await this.nats
      .sendSync(RPCServices.Users, Users.CreateAppUserCommand, data)
      .catch(e => {
        console.log(e);
        throw new GraphQLError(e.message);
      });
  }

  //@ACRoles(['Admin', 'SuperAdmin'])
  @Mutation(returns => AppUserType)
  async updateAppUser(@Args('data') data: UpdateAppUserDto) {
    return await this.nats
      .sendSync(RPCServices.Users, Users.UpdateAppUserCommand, data)
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  //@ACRoles(['Admin', 'SuperAdmin'])
  @Mutation(returns => AppUserType)
  async deleteAppUser(@Args('data') data: DeleteDto) {
    return await this.nats
      .sendSync(RPCServices.Users, Users.DeleteAppUserCommand, data)
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  @Mutation(returns => MobileVerificationType)
  async createMobileVerification(
    @Args('data') data: CreateMobileVerificationDto,
  ) {
    return await this.nats
      .sendSync(RPCServices.Users, Users.CreateMobileVerificationCommand, data)
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }


  // -------------------------  IbapUser ------------------------------------------ //

  @Mutation(returns => IbapUserType)
  async createExecutiveUser(
    @Args('data') data: CreateIbapUserDto,
    @TokenUser() user: any,
    ) {
    return await this.nats
      .sendSync(
        RPCServices.Users, 
        Users.CreateExecutiveUserCommand, 
        {data: data, tokenUser: user },
      )
      .catch(e => {
        console.log(e);
        throw new GraphQLError(e.message);
      });
  }

  @Mutation(returns => LoginType, { nullable: true })
  async loginExecutiveUser(@Args('data') data: LoginExecutiveUserDto) {
    return await this.nats
      .sendSync(RPCServices.Users, Users.LoginExecutiveUserCommand, data)
      .catch(e => {
        console.log(e)
        throw new GraphQLError(e.message)
      });
  }

  //@ACRoles(['Admin', 'SuperAdmin'])
  @Mutation(returns => IbapUserType)
  async updateExecutiveUser(
    @Args('data') data: UpdateIbapUserDto,
    @TokenUser() user: any,
    ) {
    return await this.nats
      .sendSync(
        RPCServices.Users, 
        Users.UpdateExecutiveUserCommand, 
        {data: data, tokenUser: user },
      )
      .catch(e => {
        console.log("inside update.....",e);
        
        throw new GraphQLError(e.message);
      });
  }

  //@ACRoles(['Admin', 'SuperAdmin'])
  @Mutation(returns => IbapUserType)
  async updateExecutiveUserStatus(
    @Args('data') data: UpdateExecutiveStatusDto,
    @TokenUser() user: any,
    ) {
    return await this.nats
      .sendSync(
        RPCServices.Users, 
        Users.UpdateExecuticeStatusCommand, 
        {data: data, tokenUser: user },
      )
      .catch(e => {
        console.log("inside update.....",e);
        
        throw new GraphQLError(e.message);
      });
  }

  //@ACRoles(['Admin', 'SuperAdmin'])
  @Mutation(returns => IbapUserType)
  async deleteExecutiveUser(
    @Args('data') data: DeleteDto,
    @TokenUser() user: any,
    ) {
    return await this.nats
      .sendSync(
        RPCServices.Users, 
        Users.DeleteExecutiveUserCommand, 
        {data: data, tokenUser: user }
      )
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  
}
