import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RpcException } from '@nestjs/microservices';
import { RPCServices } from '../../services/rpc-services';
import { Auth } from '../../services/auth/services';
import { NatsClientService } from '../rpc-clients/nats/nats-client.module';

@Injectable()
export class RpcAuthGuard implements CanActivate {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly natsClientService: NatsClientService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToRpc().getData();
    const user = await this.natsClientService.sendSync(
      RPCServices.Auth,
      Auth.ValidateUser,
      { token: request.token },
    );
    if (!user) {
      throw new RpcException({ status: 'error', error: 'Unauthorized' });
    }
    return user;
  }
}
