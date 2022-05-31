import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { AuthUser } from '../../models/authUser.model';

export class LoginCommand {
  constructor(readonly dto: any) {}
}

@CommandHandler(LoginCommand)
export class LoginHandler
  implements ICommandHandler<LoginCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
  ) {}

  async execute(command: LoginCommand): Promise<any> {
    const authUser = await this.publisher.mergeObjectContext(
      new AuthUser(this.repos, command.dto.id),
    );
    const state = await authUser.login(command.dto);
    authUser.commit();
    return state;
  }
}