import {
  QueryHandler,
  IQueryHandler,
} from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { GqlBuildCondition } from 'ibap-common/dist/common/snippets/gql-build-condition';
import { GqlFieldsmapPopulate } from 'ibap-common/dist/common/snippets/gql-fieldsmap-populate';

export class GetOneAccessTokenQuery {
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

@QueryHandler(GetOneAccessTokenQuery)
export class GetOneAccessTokenHandler
  implements IQueryHandler<GetOneAccessTokenQuery> {
  constructor(private readonly repos: RepositoryCollection) {}

  async execute(query: GetOneAccessTokenQuery): Promise<any> {
    let qry = this.repos.accessTokenModel.findOne(
      GqlBuildCondition(query.params.condition),
    );
    qry = GqlFieldsmapPopulate(qry, query.params.fieldsMap);

    return await qry.exec();
  }
}
