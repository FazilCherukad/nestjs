import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { Mobileverification } from '../../models/mobileverification.model';

export class DeleteMobileverificationCommand {
  constructor(readonly dto: any) {}
}

@CommandHandler(DeleteMobileverificationCommand)
export class DeleteMobileverificationHandler
  implements ICommandHandler<DeleteMobileverificationCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
  ) {}

  async execute(command: DeleteMobileverificationCommand): Promise<any> {
    const mobileverification = await this.publisher.mergeObjectContext(
      new Mobileverification(this.repos, command.dto.id),
    );
    const state = await mobileverification.delete();
    mobileverification.commit();
    return state;
  }
}
