import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { AccessToken } from '../../models/accessToken.model';

export class CreateAccessTokenCommand {
  constructor(readonly dto: any) {}
}

@CommandHandler(CreateAccessTokenCommand)
export class CreateAccessTokenHandler
  implements ICommandHandler<CreateAccessTokenCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
  ) {}

  async execute(command: CreateAccessTokenCommand): Promise<any> {
    const accessToken = await this.publisher.mergeObjectContext(
      new AccessToken(this.repos),
    );
    const state = await accessToken.create(command.dto);
    accessToken.commit();
    return state;
  }
}
