import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { RepositoryCollection } from '../../repositories';
import { GqlBuildCondition } from 'ibap-common/dist/common/snippets/gql-build-condition';
import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
import { GqlFieldsmapPopulate } from 'ibap-common/dist/common/snippets/gql-fieldsmap-populate';
import { RPCServices } from 'ibap-common/dist/services/rpc-services';
import { Auth } from 'ibap-common/dist/services/auth/services';

export class GetManyAppUserQuery {
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

@QueryHandler(GetManyAppUserQuery)
export class GetManyAppUserHandler implements IQueryHandler<GetManyAppUserQuery> {
  constructor(
    private readonly repos: RepositoryCollection,
    private readonly nats: NatsClientService,
  ) { }

  async execute(query: GetManyAppUserQuery): Promise<any> {
    var condition = query.params.condition
    var customerQueryFound = false
    var customerQuery = {}
    if(condition && condition.hasOwnProperty('email')){
      customerQueryFound  = true
      customerQuery = {email:condition.email}
      delete condition.email;  
    }
    if(condition && condition.hasOwnProperty('mobile')){
      customerQueryFound  = true
      customerQuery = {...customerQuery, mobile:condition.mobile}
      delete condition.mobile;  
    }
    if(condition && condition.hasOwnProperty('customer')){
      customerQueryFound  = true
      customerQuery = {...customerQuery, firstName:condition.customer}
      delete condition.customer;  
    }

    if(customerQueryFound){
      var userIds = []
      const users = await this.nats.sendSync(
        RPCServices.Auth,
        Auth.GetManyAuthUsersQuery,
        {
          condition: customerQuery,
          fieldsMap: {},
        },
      );
      for(var i=0; i<users.length; i++){
        userIds.push(users[i].id)
      }
      condition = {...condition, authUser:{___in:userIds}}
    }

    let qry = this.repos.appUserModel
      .find(GqlBuildCondition(condition))
      .limit(query.params.limit)
      .skip(query.params.skip)
      .sort(query.params.sort);
    qry = GqlFieldsmapPopulate(qry, query.params.fieldsMap);

    let d = await qry.exec();
    // console.log('qu..............', d);
    return d;
  }
}
