import { CommandBus } from '@nestjs/cqrs';
import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { RPCServices } from 'ibap-common/dist/services/rpc-services';
import { Auth } from 'ibap-common/dist/services/auth/services';

import { CreateAccessTokenCommand } from '../commands/accessToken/create-accessToken.command';
import { UpdateAccessTokenCommand } from '../commands/accessToken/update-accessToken.command';
import { DeleteAccessTokenCommand } from '../commands/accessToken/delete-accessToken.command';

import { CreateAuthUserCommand } from '../commands/authUser/create-authUser.command';
import { UpdateAuthUserCommand } from '../commands/authUser/update-authUser.command';
import { DeleteAuthUserCommand } from '../commands/authUser/delete-authUser.command';

import { CreateClientCommand } from '../commands/client/create-client.command';
import { UpdateClientCommand } from '../commands/client/update-client.command';
import { DeleteClientCommand } from '../commands/client/delete-client.command';
import { UpdatePasswordCommand } from '../commands/authUser/update-password.command';
import { ValidateAuthUserCommand } from '../commands/authUser/validate-authUser.command';
import { LoginCommand } from '../commands/authUser/login.command';
import { AttachRoleCommand } from '../commands/authUser/attach-role.command';

@Controller()
export class CommandController {
  constructor(private readonly commandBus: CommandBus) { }

  // ---------------------------------- Client ----------------------------------------------/

  @MessagePattern({
    service: RPCServices.Auth,
    cmd: Auth.CreateClientCommand,
  })
  async createClient(dto: any) {
    return await this.commandBus
      .execute(new CreateClientCommand(dto))
      .catch(e => {
        throw new RpcException(e.message);
      });
  }

  @MessagePattern({
    service: RPCServices.Auth,
    cmd: Auth.UpdateClientCommand,
  })
  async updateClient(dto: any) {
    return await this.commandBus
      .execute(new UpdateClientCommand(dto))
      .catch(e => {
        throw new RpcException(e.message);
      });
  }

  @MessagePattern({
    service: RPCServices.Auth,
    cmd: Auth.DeleteClientCommand,
  })
  async deleteClient(dto: any) {
    return await this.commandBus
      .execute(new DeleteClientCommand(dto))
      .catch(e => {
        throw new RpcException(e.message);
      });
  }

  // ---------------------------------- AuthUser ----------------------------------------------/

  @MessagePattern({
    service: RPCServices.Auth,
    cmd: Auth.AttachRoleCommand,
  })
  async attachRole(dto: any) {
    return await this.commandBus
      .execute(new AttachRoleCommand(dto))
      .catch(e => {
        throw new RpcException(e.message);
      });
  }


  @MessagePattern({
    service: RPCServices.Auth,
    cmd: Auth.CreateAuthUserCommand,
  })
  async createAuthUser(dto: any) {
    return await this.commandBus
      .execute(new CreateAuthUserCommand(dto))
      .catch(e => {
        throw new RpcException(e.message);
      });
  }

  @MessagePattern({
    service: RPCServices.Auth,
    cmd: Auth.UpdateAuthUserCommand,
  })
  async updateAuthUser(dto: any) {
    return await this.commandBus
      .execute(new UpdateAuthUserCommand(dto))
      .catch(e => {
        throw new RpcException(e.message);
      });
  }

  @MessagePattern({
    service: RPCServices.Auth,
    cmd: Auth.DeleteAuthUserCommand,
  })
  async deleteAuthUser(dto: any) {
    return await this.commandBus
      .execute(new DeleteAuthUserCommand(dto))
      .catch(e => {
        throw new RpcException(e.message);
      });
  }

  @MessagePattern({
    service: RPCServices.Auth,
    cmd: Auth.UpdatePasswordCommand,
  })
  async updatePassword(dto: any) {
    return await this.commandBus
      .execute(new UpdatePasswordCommand(dto))
      .catch(e => {
        throw new RpcException(e.message);
      });
  }

  @MessagePattern({
    service: RPCServices.Auth,
    cmd: Auth.ValidateAuthUserCommand,
  })
  async validateAuthUser(dto: any) {
    return await this.commandBus
      .execute(new ValidateAuthUserCommand(dto))
      .catch(e => {
        throw new RpcException(e.message);
      });
  }

  @MessagePattern({
    service: RPCServices.Auth,
    cmd: Auth.LoginCommand,
  })
  async login(dto: any) {
    return await this.commandBus
      .execute(new LoginCommand(dto))
      .catch(e => {
        switch (e.message) {
          case 'client_not_allowed':
            throw new RpcException("client_not_allowed");
          case 'user_not_found':
            throw new RpcException("Username_does_not_exist");
          case 'password_not_match':
            throw new RpcException('Invalid_password');
          default:
            break;
        }
      });
  }

  // ---------------------------------- AccessToken ----------------------------------------------/

  @MessagePattern({
    service: RPCServices.Auth,
    cmd: Auth.CreateAccessTokenCommand,
  })
  async createAccessToken(dto: any) {
    return await this.commandBus
      .execute(new CreateAccessTokenCommand(dto))
      .catch(e => {
        throw new RpcException(e.message);
      });
  }

  @MessagePattern({
    service: RPCServices.Auth,
    cmd: Auth.UpdateAccessTokenCommand,
  })
  async updateAccessToken(dto: any) {
    return await this.commandBus
      .execute(new UpdateAccessTokenCommand(dto))
      .catch(e => {
        throw new RpcException(e.message);
      });
  }

  @MessagePattern({
    service: RPCServices.Auth,
    cmd: Auth.DeleteAccessTokenCommand,
  })
  async deleteAccessToken(dto: any) {
    return await this.commandBus
      .execute(new DeleteAccessTokenCommand(dto))
      .catch(e => {
        throw new RpcException(e.message);
      });
  }
}
