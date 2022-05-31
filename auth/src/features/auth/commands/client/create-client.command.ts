import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { Client } from '../../models/client.model';

export class CreateClientCommand {
  constructor(readonly dto: any) {}
}

@CommandHandler(CreateClientCommand)
export class CreateClientHandler
  implements ICommandHandler<CreateClientCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
  ) {}

  async execute(command: CreateClientCommand): Promise<any> {
    const client = await this.publisher.mergeObjectContext(
      new Client(this.repos),
    );
    const state = await client.create(command.dto);
    client.commit();
    return state;
  }
}
