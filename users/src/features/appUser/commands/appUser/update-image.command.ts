import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { AddImageDto } from '../../dto/add-image-dto';
import { AppUser } from '../../models/appUser.model';

export class UpdateAppUserImageCommand {
  constructor(readonly dto: AddImageDto, readonly file: any) {}
}

@CommandHandler(UpdateAppUserImageCommand)
export class UpdateAppUserImageHandler
  implements ICommandHandler<UpdateAppUserImageCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
  ) {}

  async execute(command: UpdateAppUserImageCommand): Promise<any> {
    let ad = await this.publisher.mergeObjectContext(
      new AppUser(this.repos, command.dto.id),
    );
    let state = ad.updateImage(command.file);
    ad.commit();
    return state;
  }
}
