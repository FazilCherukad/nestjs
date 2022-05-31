import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { AuthUser } from '../../models/authUser.model';

export class DeleteAuthUserCommand {
  constructor(readonly dto: any) {}
}

@CommandHandler(DeleteAuthUserCommand)
export class DeleteAuthUserHandler
  implements ICommandHandler<DeleteAuthUserCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
  ) {}

  async execute(command: DeleteAuthUserCommand): Promise<any> {
    const authUser = await this.publisher.mergeObjectContext(
      new AuthUser(this.repos, command.dto.id),
    );
    const state = await authUser.delete();
    authUser.commit();
    return state;
  }
}
