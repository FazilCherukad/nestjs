import { CommandBus } from '@nestjs/cqrs';
import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { RPCServices } from 'ibap-common/dist/services/rpc-services';
import { Users } from 'ibap-common/dist/services/users/services';
import { DeleteAppUserCommand } from '../commands/appUser/delete-appUser.command';
import { UpdateAppUserCommand } from '../commands/appUser/update-appUser.command';
import { CreateAppUserCommand } from '../commands/appUser/create-appUser.command';
import { CreateMobileverificationCommand } from '../commands/mobileVerification/create-mobileverification.command';
import { UpdateMobileverificationCommand } from '../commands/mobileVerification/update-mobileVerification.command';
import { DeleteMobileverificationCommand } from '../commands/mobileVerification/delete-mobileVerification.command';
import { UpdateAppUserPasswordCommand } from '../commands/appUser/update-appUser-password.command';
import { VerifyOtpCommand } from '../commands/mobileVerification/verify-otp.command';
import { AppUserLoginCommand } from '../commands/appUser/login-appUser.command';

@Controller()
export class CommandController {
  constructor(private readonly commandBus: CommandBus) { }

  @MessagePattern({ service: RPCServices.Users, cmd: Users.CreateAppUserCommand })
  async createAppUser(dto: any) {
    return await this.commandBus
      .execute(new CreateAppUserCommand(dto))
      .catch(e => {
        switch (e.message) {
          case 'username_already_registered':
            throw new RpcException('username_already_registered');
          default:
            throw new RpcException('unknow_error');
        }
      });
  }

  @MessagePattern({ service: RPCServices.Users, cmd: Users.AppUserLoginCommand })
  async loginAppUser(dto: any) {
    return await this.commandBus
      .execute(new AppUserLoginCommand(dto))
      .catch(e => {
        switch (e.message) {
          case 'username_already_registered':
            throw new RpcException('username_already_registered');
          case 'invalid_otp':
            throw new RpcException('invalid_otp');
          default:
            throw new RpcException('unknow_error');
        }
      });
  }

  @MessagePattern({ service: RPCServices.Users, cmd: Users.UpdateAppUserCommand })
  async updateAppUser(dto: any) {
    return await this.commandBus
      .execute(new UpdateAppUserCommand(dto))
      .catch(e => {
        throw new RpcException(e.message);
      });
  }

  @MessagePattern({ service: RPCServices.Users, cmd: Users.DeleteAppUserCommand })
  async deleteAppUser(dto: any) {
    return await this.commandBus
      .execute(new DeleteAppUserCommand(dto))
      .catch(e => {
        throw new RpcException(e.message);
      });
  }



  // ---------------------------------- Mobileverification ----------------------------------------------/

  @MessagePattern({
    service: RPCServices.Users,
    cmd: Users.CreateMobileVerificationCommand,
  })
  async createMobileverification(dto: any) {
    return await this.commandBus
      .execute(new CreateMobileverificationCommand(dto))
      .catch(e => {
        throw new RpcException(e.message);
      });
  }

  @MessagePattern({
    service: RPCServices.Users,
    cmd: Users.VerifyOtpCommand,
  })
  async verifyOtp(dto: any) {
    return await this.commandBus
      .execute(new VerifyOtpCommand(dto))
      .catch(e => {
        throw new RpcException(e.message);
      });
  }

  // @MessagePattern({
  //   service: RPCServices.Users,
  //   cmd: Users.UpdateMobileVerificationCommand,
  // })
  // async updateMobileverification(dto: any) {
  //   return await this.commandBus
  //     .execute(new UpdateMobileverificationCommand(dto))
  //     .catch(e => {
  //       throw new RpcException(e.message);
  //     });
  // }

  // @MessagePattern({
  //   service: RPCServices.Users,
  //   cmd: Users.DeleteMobileVerificationCommand,
  // })
  // async deleteMobileverification(dto: any) {
  //   return await this.commandBus
  //     .execute(new DeleteMobileverificationCommand(dto))
  //     .catch(e => {
  //       throw new RpcException(e.message);
  //     });
  // }

}
