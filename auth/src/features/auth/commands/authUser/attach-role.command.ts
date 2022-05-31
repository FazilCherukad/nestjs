import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";
import { RepositoryCollection } from "../../repositories";
import { AuthUser } from "../../models/authUser.model";

export class AttachRoleCommand {
  constructor(readonly dto: any) {}
}

@CommandHandler(AttachRoleCommand)
export class AttachRoleHandler
  implements ICommandHandler<AttachRoleCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
  ) {}

  async execute(command: AttachRoleCommand): Promise<any> {
    const authUser = await this.publisher.mergeObjectContext(
      new AuthUser(this.repos,command.dto.id),
    );
    const state = await authUser.attachRole(command.dto);
    authUser.commit();
    return state;
  }
}