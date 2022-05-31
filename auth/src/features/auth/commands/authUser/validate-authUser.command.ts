import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { AuthUser } from '../../models/authUser.model';

export class ValidateAuthUserCommand {
  constructor(readonly dto: any) {}
}

@CommandHandler(ValidateAuthUserCommand)
export class ValidateAuthUserHandler
  implements ICommandHandler<ValidateAuthUserCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
  ) {}

  async execute(command: ValidateAuthUserCommand): Promise<any> {
    const authUser = await this.publisher.mergeObjectContext(
      new AuthUser(this.repos, command.dto.id),
    );
    const state = await authUser.validateAuthUser(command.dto);
    authUser.commit();
    return state;
  }
}
