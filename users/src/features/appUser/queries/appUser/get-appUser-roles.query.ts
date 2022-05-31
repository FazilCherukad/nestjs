import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
import { RepositoryCollection } from '../../repositories';

export class GetAppUserRolesQuery {
  constructor(readonly query: any) {}
}

@QueryHandler(GetAppUserRolesQuery)
export class GetAppUserRolesQueryHandler
  implements IQueryHandler<GetAppUserRolesQuery> {
  constructor(
    private readonly nats: NatsClientService,
    private readonly repos: RepositoryCollection,
  ) {}
  async execute(query: GetAppUserRolesQuery): Promise<any> {
    let user = await this.repos.appUserModel.findOne({ _id: query.query.token });
  }
}
