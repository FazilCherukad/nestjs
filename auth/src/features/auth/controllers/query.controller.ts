import { QueryBus } from '@nestjs/cqrs';
import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { RPCServices } from 'ibap-common/dist/services/rpc-services';
import { Auth } from 'ibap-common/dist/services/auth/services';

import { GetOneAccessTokenQuery } from '../queries/accessToken/get-one-accessToken.query';
import { GetManyAccessTokensQuery } from '../queries/accessToken/get-many-accessTokens.query';

import { GetOneAuthUserQuery } from '../queries/authUser/get-one-authUser.query';
import { GetManyAuthUsersQuery } from '../queries/authUser/get-many-authUsers.query';

import { GetOneClientQuery } from '../queries/client/get-one-client.query';
import { GetManyClientsQuery } from '../queries/client/get-many-clients.query';

@Controller()
export class QueryController {
  constructor(private readonly queryBus: QueryBus) { }

  // ---------------------------------- Client ----------------------------------------------/

  @MessagePattern({
    service: RPCServices.Auth,
    cmd: Auth.GetOneClientQuery,
  })
  async getOneClient(query: any) {
    return await this.queryBus
      .execute(new GetOneClientQuery(query))
      .catch(e => {
        throw new RpcException(e);
      });
  }

  @MessagePattern({
    service: RPCServices.Auth,
    cmd: Auth.GetManyClientsQuery,
  })
  async getManyClients(query: any) {
    return await this.queryBus
      .execute(new GetManyClientsQuery(query))
      .catch(e => {
        throw new RpcException(e);
      });
  }

  // ---------------------------------- AuthUser ----------------------------------------------/

  @MessagePattern({
    service: RPCServices.Auth,
    cmd: Auth.GetOneAuthUserQuery,
  })
  async getOneAuthUser(query: any) {
    console.log("..............");
    
    let d = await this.queryBus
      .execute(new GetOneAuthUserQuery(query))
      .catch(e => {
        throw new RpcException(e);
      });
    return d;
  }

  @MessagePattern({
    service: RPCServices.Auth,
    cmd: Auth.GetManyAuthUsersQuery,
  })
  async getManyAuthUsers(query: any) {
    console.log(".....")
    return await this.queryBus
      .execute(new GetManyAuthUsersQuery(query))
      .catch(e => {
        throw new RpcException(e);
      });
  }

  // ---------------------------------- AccessToken ----------------------------------------------/

  @MessagePattern({
    service: RPCServices.Auth,
    cmd: Auth.GetOneAccessTokenQuery,
  })
  async getOneAccessToken(query: any) {
    return await this.queryBus
      .execute(new GetOneAccessTokenQuery(query))
      .catch(e => {
        throw new RpcException(e);
      });
  }

  @MessagePattern({
    service: RPCServices.Auth,
    cmd: Auth.GetManyAccessTokensQuery,
  })
  async getManyAccessTokens(query: any) {
    return await this.queryBus
      .execute(new GetManyAccessTokensQuery(query))
      .catch(e => {
        throw new RpcException(e);
      });
  }
}
