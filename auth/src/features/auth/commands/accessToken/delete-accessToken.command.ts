import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { AccessToken } from '../../models/accessToken.model';

export class DeleteAccessTokenCommand {
  constructor(readonly dto: any) {}
}

@CommandHandler(DeleteAccessTokenCommand)
export class DeleteAccessTokenHandler
  implements ICommandHandler<DeleteAccessTokenCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
  ) {}

  async execute(command: DeleteAccessTokenCommand): Promise<any> {
    const accessToken = await this.publisher.mergeObjectContext(
      new AccessToken(this.repos, command.dto.id),
    );
    const state = await accessToken.delete();
    accessToken.commit();
    return state;
  }
}
