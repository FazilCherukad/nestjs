import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
import { AppUser } from '../../models/appUser.model';

export class UpdateAppUserCommand {
  constructor(readonly dto: any) { }
}

@CommandHandler(UpdateAppUserCommand)
export class UpdateAppUserHandler implements ICommandHandler<UpdateAppUserCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
    private readonly nats: NatsClientService,
  ) { }

  async execute(command: UpdateAppUserCommand): Promise<any> {
    const appUser = await this.publisher.mergeObjectContext(
      new AppUser(this.repos, command.dto.id),
    );
    appUser.nats = this.nats;
    const state = await appUser.update(command.dto);
    appUser.commit();
    return state;
  }
}
