import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { AuthUser } from '../../models/authUser.model';

export class UpdateAuthUserCommand {
  constructor(readonly dto: any) {}
}

@CommandHandler(UpdateAuthUserCommand)
export class UpdateAuthUserHandler
  implements ICommandHandler<UpdateAuthUserCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
  ) {}

  async execute(command: UpdateAuthUserCommand): Promise<any> {
    console.log("update.....")
    const authUser = await this.publisher.mergeObjectContext(
      new AuthUser(this.repos, command.dto.id),
    );
    const state = await authUser.update(command.dto);
    authUser.commit();
    return state;
  }
}
