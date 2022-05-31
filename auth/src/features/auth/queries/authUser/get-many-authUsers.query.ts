import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { GqlBuildCondition } from 'ibap-common/dist/common/snippets/gql-build-condition';
import { GqlFieldsmapPopulate } from 'ibap-common/dist/common/snippets/gql-fieldsmap-populate';

export class GetManyAuthUsersQuery {
  constructor(
    readonly params: {
      condition?: any;
      projection?: any;
      fieldsMap?: any;
      limit?: number;
      sort?: any;
      skip: number;
    },
  ) { }
}

@QueryHandler(GetManyAuthUsersQuery)
export class GetManyAuthUsersHandler
  implements IQueryHandler<GetManyAuthUsersQuery> {
  constructor(private readonly repos: RepositoryCollection) { }

  async execute(query: GetManyAuthUsersQuery): Promise<any> {
    let qry = this.repos.authUserModel
      .find(GqlBuildCondition(query.params.condition))
      .limit(query.params.limit)
      .skip(query.params.skip)
      .sort(query.params.sort);
    qry = GqlFieldsmapPopulate(qry, query.params.fieldsMap);

    let d = await qry.exec();
    // console.log(".................d", d);
    return d;

  }
}
