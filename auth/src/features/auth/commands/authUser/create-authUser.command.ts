import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { AuthUser } from '../../models/authUser.model';

export class CreateAuthUserCommand {
  constructor(readonly dto: any) {}
}

@CommandHandler(CreateAuthUserCommand)
export class CreateAuthUserHandler
  implements ICommandHandler<CreateAuthUserCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
  ) {}

  async execute(command: CreateAuthUserCommand): Promise<any> {
    const authUser = await this.publisher.mergeObjectContext(
      new AuthUser(this.repos),
    );
    const state = await authUser.create(command.dto);
    authUser.commit();
    return state;
  }
}
