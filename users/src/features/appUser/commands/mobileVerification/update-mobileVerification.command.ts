import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { Mobileverification } from '../../models/mobileverification.model';

export class UpdateMobileverificationCommand {
  constructor(readonly dto: any) {}
}

@CommandHandler(UpdateMobileverificationCommand)
export class UpdateMobileverificationHandler
  implements ICommandHandler<UpdateMobileverificationCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
  ) {}

  async execute(command: UpdateMobileverificationCommand): Promise<any> {
    const mobileverification = await this.publisher.mergeObjectContext(
      new Mobileverification(this.repos, command.dto.id),
    );
    const state = await mobileverification.update(command.dto);
    mobileverification.commit();
    return state;
  }
}
