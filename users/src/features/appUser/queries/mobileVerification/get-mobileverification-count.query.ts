import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { RepositoryCollection } from "../../repositories";
import { GqlBuildCondition } from 'ibap-common/dist/common/snippets/gql-build-condition';

export class GetMobileVerificationsCountQuery {
  constructor(
    readonly params: {
      condition?: any
      date?: any
    }
  ) { }
}

@QueryHandler(GetMobileVerificationsCountQuery)
export class GetMobileVerificationsCountHandler implements IQueryHandler<GetMobileVerificationsCountQuery>{
  constructor(
    private readonly repos: RepositoryCollection
  ) { }

  async  execute(query: GetMobileVerificationsCountQuery): Promise<any> {
    //{ createdAt: query.params.date }
    let condition = Object.assign({}, query.params.condition, { deleted: false }) 
    console.log(">>>>>>>>>>>>", condition)
    let count = await this.repos.mobileverificationModel.countDocuments(GqlBuildCondition(condition));
    console.log("here..................", count)
    return count.toString();
  }

}