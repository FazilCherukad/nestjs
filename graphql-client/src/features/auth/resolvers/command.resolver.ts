import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
import { RPCServices } from 'ibap-common/dist/services/rpc-services';
import { Auth } from 'ibap-common/dist/services/auth/services';
import { Int } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { DeleteDto } from '../../../common/dtos/delete.dto';
import { GraphQLError } from 'graphql';

import { AccessTokenType } from '../types/accesstoken.type';
import { CreateAccessTokenDto } from '../dtos/create-accesstoken.dto';
import { UpdateAccessTokenDto } from '../dtos/update-accesstoken.dto';

import { AuthUserType } from '../types/authuser.type';
import { CreateAuthUserDto } from '../dtos/create-authuser.dto';
import { UpdateAuthUserDto } from '../dtos/update-authuser.dto';

import { ClientType } from '../types/client.type';
import { CreateClientDto } from '../dtos/create-client.dto';
import { UpdateClientDto } from '../dtos/update-client.dto';
import { ValidateAuthUserDto } from '../dtos/validate-authUser.dto';
import { PasswordGrantDto } from '../dtos/password-grant.dto';
import { LoginType } from '../types/loginType';
import { AttachRoleDto } from '../dtos/attach-role.dto';
import { ACRoles } from '../../../common/access-controll/decorators/ac-roles.decorator';
import { UpdatePasswordDto } from '../dtos/update-password.dto';

@Resolver()
export class CommandResolver {
  constructor(private readonly nats: NatsClientService) {}

  // Message_Patterns

  // -------------------------  Client ------------------------------------------ //

  //@ACRoles(['SuperAdmin'])
  @Mutation(returns => ClientType)
  async createClient(@Args('data') data: CreateClientDto) {
    return await this.nats
      .sendSync(RPCServices.Auth, Auth.CreateClientCommand, data)
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  //@ACRoles(['SuperAdmin'])
  @Mutation(returns => ClientType)
  async updateClient(@Args('data') data: UpdateClientDto) {
    return await this.nats
      .sendSync(RPCServices.Auth, Auth.UpdateClientCommand, data)
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  //@ACRoles(['SuperAdmin'])
  @Mutation(returns => ClientType)
  async deleteClient(@Args('data') data: DeleteDto) {
    return await this.nats
      .sendSync(RPCServices.Auth, Auth.DeleteClientCommand, data)
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  // -------------------------  AuthUser ------------------------------------------ //

  // //@ACRoles(["SuperAdmin", "Admin", "User"])
  @Mutation(returns => AuthUserType)
  async createAuthUser(@Args('data') data: CreateAuthUserDto) {
    return await this.nats
      .sendSync(RPCServices.Auth, Auth.CreateAuthUserCommand, data)
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  @Mutation(returns => AuthUserType)
  async attachRole(@Args('data') data: AttachRoleDto) {
    return await this.nats
      .sendSync(RPCServices.Auth, Auth.AttachRoleCommand, data)
      .catch(e => {
        console.log('.........', e);
        throw new GraphQLError(e.message);
      });
  }

  @Mutation(returns => AuthUserType)
  async updateAuthUser(@Args('data') data: UpdateAuthUserDto) {
    return await this.nats
      .sendSync(RPCServices.Auth, Auth.UpdateAuthUserCommand, data)
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  @Mutation(returns => AuthUserType)
  async deleteAuthUser(@Args('data') data: DeleteDto) {
    return await this.nats
      .sendSync(RPCServices.Auth, Auth.DeleteAuthUserCommand, data)
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  @Mutation(returns => AuthUserType)
  async updatePassword(@Args('data') data: UpdatePasswordDto) {
    return await this.nats
      .sendSync(RPCServices.Auth, Auth.UpdatePasswordCommand, data)
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  @Mutation(returns => AuthUserType, { nullable: true })
  async validateAuthUser(@Args('data') data: ValidateAuthUserDto) {
    return await this.nats
      .sendSync(RPCServices.Auth, Auth.ValidateAuthUserCommand, data)
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  @Mutation(returns => LoginType, { nullable: true })
  async login(@Args('data') data: PasswordGrantDto) {
    console.log('here change')
    console.log(data)
    return await this.nats
      .sendSync(RPCServices.Auth, Auth.LoginCommand, data)
      .catch(e => {
        console.log(e)
        throw new GraphQLError(e.message)
      });
  }

  // -------------------------  AccessToken ------------------------------------------ //

  @Mutation(returns => AccessTokenType)
  async createAccessToken(@Args('data') data: CreateAccessTokenDto) {
    return await this.nats
      .sendSync(RPCServices.Auth, Auth.CreateAccessTokenCommand, data)
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  @Mutation(returns => AccessTokenType)
  async updateAccessToken(@Args('data') data: UpdateAccessTokenDto) {
    return await this.nats
      .sendSync(RPCServices.Auth, Auth.UpdateAccessTokenCommand, data)
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  @Mutation(returns => AccessTokenType)
  async deleteAccessToken(@Args('data') data: DeleteDto) {
    return await this.nats
      .sendSync(RPCServices.Auth, Auth.DeleteAccessTokenCommand, data)
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }
}
