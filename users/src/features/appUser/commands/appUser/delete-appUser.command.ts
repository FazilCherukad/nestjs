import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { AppUser } from '../../models/appUser.model';

export class DeleteAppUserCommand {
  constructor(readonly dto: any) { }
}

@CommandHandler(DeleteAppUserCommand)
export class DeleteAppUserHandler implements ICommandHandler<DeleteAppUserCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
  ) { }

  async execute(command: DeleteAppUserCommand): Promise<any> {
    const appUser = await this.publisher.mergeObjectContext(
      new AppUser(this.repos, command.dto.id),
    );
    const state = await appUser.delete();
    appUser.commit();
    return state;
  }
}
