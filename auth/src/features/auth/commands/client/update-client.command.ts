import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { Client } from '../../models/client.model';

export class UpdateClientCommand {
  constructor(readonly dto: any) {}
}

@CommandHandler(UpdateClientCommand)
export class UpdateClientHandler
  implements ICommandHandler<UpdateClientCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
  ) {}

  async execute(command: UpdateClientCommand): Promise<any> {
    const client = await this.publisher.mergeObjectContext(
      new Client(this.repos, command.dto.id),
    );
    const state = await client.update(command.dto);
    client.commit();
    return state;
  }
}
