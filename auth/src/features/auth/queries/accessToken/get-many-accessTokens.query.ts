import {
  QueryHandler,
  IQueryHandler,
} from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { GqlBuildCondition } from 'ibap-common/dist/common/snippets/gql-build-condition';
import { GqlFieldsmapPopulate } from 'ibap-common/dist/common/snippets/gql-fieldsmap-populate';

export class GetManyAccessTokensQuery {
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

@QueryHandler(GetManyAccessTokensQuery)
export class GetManyAccessTokensHandler
  implements IQueryHandler<GetManyAccessTokensQuery> {
  constructor(private readonly repos: RepositoryCollection) {}

  async execute(query: GetManyAccessTokensQuery): Promise<any> {
    let qry = this.repos.accessTokenModel
      .find(GqlBuildCondition(query.params.condition))
      .limit(query.params.limit)
      .skip(query.params.skip)
      .sort(query.params.sort);
    qry = GqlFieldsmapPopulate(qry, query.params.fieldsMap);

    return await qry.exec();
  }
}
