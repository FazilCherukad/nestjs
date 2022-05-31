import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { AccessToken } from '../../models/accessToken.model';

export class UpdateAccessTokenCommand {
  constructor(readonly dto: any) {}
}

@CommandHandler(UpdateAccessTokenCommand)
export class UpdateAccessTokenHandler
  implements ICommandHandler<UpdateAccessTokenCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
  ) {}

  async execute(command: UpdateAccessTokenCommand): Promise<any> {
    const accessToken = await this.publisher.mergeObjectContext(
      new AccessToken(this.repos, command.dto.id),
    );
    const state = await accessToken.update(command.dto);
    accessToken.commit();
    return state;
  }
}
