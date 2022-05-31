import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { GqlBuildCondition } from 'ibap-common/dist/common/snippets/gql-build-condition';
import { GqlFieldsmapPopulate } from 'ibap-common/dist/common/snippets/gql-fieldsmap-populate';

export class GetOneClientQuery {
  constructor(
    readonly params: {
      condition?: any;
      projection?: any;
      fieldsMap?: any;
      limit?: number;
      sort?: any;
      skip: number;
    },
  ) {}
}

@QueryHandler(GetOneClientQuery)
export class GetOneClientHandler implements IQueryHandler<GetOneClientQuery> {
  constructor(private readonly repos: RepositoryCollection) {}

  async execute(query: GetOneClientQuery): Promise<any> {
    let qry = this.repos.clientModel.findOne(
      GqlBuildCondition(query.params.condition),
    );
    qry = GqlFieldsmapPopulate(qry, query.params.fieldsMap);

    return await qry.exec();
  }
}
