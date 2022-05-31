import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { Client } from '../../models/client.model';

export class DeleteClientCommand {
  constructor(readonly dto: any) {}
}

@CommandHandler(DeleteClientCommand)
export class DeleteClientHandler
  implements ICommandHandler<DeleteClientCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
  ) {}

  async execute(command: DeleteClientCommand): Promise<any> {
    const client = await this.publisher.mergeObjectContext(
      new Client(this.repos, command.dto.id),
    );
    const state = await client.delete();
    client.commit();
    return state;
  }
}
