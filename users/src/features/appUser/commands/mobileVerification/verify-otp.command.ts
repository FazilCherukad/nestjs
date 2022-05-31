import { CommandHandler, ICommandHandler, EventPublisher } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { Mobileverification } from '../../models/mobileverification.model';
import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
import { HttpService } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';

export class VerifyOtpCommand {
  constructor(readonly dto: any) { }
}

@CommandHandler(VerifyOtpCommand)
export class VerifyOtpHandler
  implements ICommandHandler<VerifyOtpCommand> {
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repos: RepositoryCollection,
    private readonly nats: NatsClientService,
    private readonly https: HttpService,
    private readonly mailerService: MailerService,
  ) { }

  async execute(command: VerifyOtpCommand): Promise<any> {
    const mb = await this.publisher.mergeObjectContext(
      new Mobileverification(this.repos, this.https),
    );
    mb.mailer = this.mailerService;
    mb.nats = this.nats;
    mb.https = this.https;
    const state = await mb.verifyMobile(command.dto);
    mb.commit();
    return state;
  }
}
