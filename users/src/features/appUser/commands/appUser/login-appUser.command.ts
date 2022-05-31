import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { RPCServices } from 'ibap-common/dist/services/rpc-services';
import { Auth } from 'ibap-common/dist/services/auth/services';
import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
import { Mobileverification } from '../../models/mobileverification.model';

export class AppUserLoginCommand {
  constructor(readonly dto: any) {}
}

@CommandHandler(AppUserLoginCommand)
export class AppUserLoginHandler
  implements ICommandHandler<AppUserLoginCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
    private readonly nats: NatsClientService
  ) {}

  async execute(command: AppUserLoginCommand): Promise<any> {
    const mb = await this.publisher.mergeObjectContext(
        new Mobileverification(this.repos),
    );
    const verified = await mb.verifyMobile(command.dto);
    if(!verified) throw new Error('invalid_otp')
    const state = await this.nats.sendSync(
        RPCServices.Auth,
        Auth.LoginCommand,
        {...command.dto, password:'y'}
    );
    console.log(state)
    var customer = await this.repos.appUserModel.findOne({authUser:state.authUser.id})
    return {...state, customer_code:customer.customer_code};
  }
}