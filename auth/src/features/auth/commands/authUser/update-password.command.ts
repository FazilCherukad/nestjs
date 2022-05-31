import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { AuthUser } from '../../models/authUser.model';

export class UpdatePasswordCommand {
  constructor(readonly dto: any) {}
}

@CommandHandler(UpdatePasswordCommand)
export class UpdatePasswordHandler
  implements ICommandHandler<UpdatePasswordCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
  ) {}

  async execute(command: UpdatePasswordCommand): Promise<any> {
    const authUser = await this.publisher.mergeObjectContext(
      new AuthUser(this.repos, command.dto.id),
    );
    const state = await authUser.updatePassword(command.dto);
    authUser.commit();
    return state;
  }
}
