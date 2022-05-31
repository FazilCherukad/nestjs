import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
import { AppUser } from '../../models/appUser.model';

export class UpdateAppUserPasswordCommand {
  constructor(readonly data: any) {}
}

@CommandHandler(UpdateAppUserPasswordCommand)
export class UpdateAppUserPasswordHandler
  implements ICommandHandler<UpdateAppUserPasswordCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
    private readonly nats: NatsClientService,
  ) {}

  async execute(command: UpdateAppUserPasswordCommand): Promise<any> {
    let u = await this.publisher.mergeObjectContext(new AppUser(this.repos));
    u.nats = this.nats;
    let state = await u.updatePassword(command.data);
    u.commit();
    return state;
  }
}
