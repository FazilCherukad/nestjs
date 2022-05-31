import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
import { AppUser } from '../../models/appUser.model';

export class CreateAppUserCommand {
  constructor(readonly dto: any) { }
}

@CommandHandler(CreateAppUserCommand)
export class CreateAppUserHandler implements ICommandHandler<CreateAppUserCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
    private readonly nats: NatsClientService,
  ) { }

  async execute(command: CreateAppUserCommand): Promise<any> {
    const appUser = await this.publisher.mergeObjectContext(
      new AppUser(this.repos),
    );
    appUser.nats = this.nats;
    const state = await appUser.create(command.dto);
    appUser.commit();
    return state;
  }
}
