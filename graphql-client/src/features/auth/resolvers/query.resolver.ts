import { Resolver, Args, Query } from '@nestjs/graphql';
import { Int } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
import { GqlFieldsMap } from 'ibap-common/dist/common/decorators/gql-fields-map.decorator';
import { GqlProjection } from 'ibap-common/dist/common/decorators/gql-projection.decorator';
import { RPCServices } from 'ibap-common/dist/services/rpc-services';
import { Auth } from 'ibap-common/dist/services/auth/services';
import { GraphQLError } from 'graphql';

import { AccessTokenType } from '../types/accesstoken.type';

import { AuthUserType } from '../types/authuser.type';

import { ClientType } from '../types/client.type';

@Resolver()
export class QueryResolver {
  constructor(private readonly nats: NatsClientService) {}

  // Message_Patterns

  // -------------------------  Client ------------------------------------------ //

  @Query(returns => ClientType)
  async getOneClient(
    @GqlFieldsMap() fieldsMap: any,
    @GqlProjection() projection,
    @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
    condition: any,
  ) {
    return await this.nats
      .sendSync(RPCServices.Auth, Auth.GetOneClientQuery, {
        condition: condition,
        fieldsMap: fieldsMap,
      })
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  @Query(returns => [ClientType])
  async getManyClients(
    @GqlFieldsMap() fieldsMap: any,
    @GqlProjection() projection,
    @Args({ name: 'limit', nullable: true, type: () => Int }) limit: number,
    @Args({ name: 'skip', nullable: true, type: () => Int }) skip: number,
    @Args({ name: 'sort', nullable: true, type: () => String }) sort: string,
    @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
    condition: any,
  ) {
    return await this.nats
      .sendSync(RPCServices.Auth, Auth.GetManyClientsQuery, {
        limit: limit,
        skip: skip,
        sort: sort,
        condition: condition,
        fieldsMap: fieldsMap,
      })
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  // -------------------------  AuthUser ------------------------------------------ //

  @Query(returns => AuthUserType)
  async getOneAuthUser(
    @GqlFieldsMap() fieldsMap: any,
    @GqlProjection() projection,
    @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
    condition: any,
  ) {
    return await this.nats
      .sendSync(RPCServices.Auth, Auth.GetOneAuthUserQuery, {
        condition: condition,
        fieldsMap: fieldsMap,
      })
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  @Query(returns => [AuthUserType], { nullable: true})
  async getManyAuthUsers(
    @GqlFieldsMap() fieldsMap: any,
    @GqlProjection() projection,
    @Args({ name: 'limit', nullable: true, type: () => Int }) limit: number,
    @Args({ name: 'skip', nullable: true, type: () => Int }) skip: number,
    @Args({ name: 'sort', nullable: true, type: () => String }) sort: string,
    @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
    condition: any,
  ) {
    return await this.nats
      .sendSync(RPCServices.Auth, Auth.GetManyAuthUsersQuery, {
        limit: limit,
        skip: skip,
        sort: sort,
        condition: condition,
        fieldsMap: fieldsMap,
      })
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  // -------------------------  AccessToken ------------------------------------------ //

  @Query(returns => AccessTokenType)
  async getOneAccessToken(
    @GqlFieldsMap() fieldsMap: any,
    @GqlProjection() projection,
    @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
    condition: any,
  ) {
    return await this.nats
      .sendSync(RPCServices.Auth, Auth.GetOneAccessTokenQuery, {
        condition: condition,
        fieldsMap: fieldsMap,
      })
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  @Query(returns => [AccessTokenType])
  async getManyAccessTokens(
    @GqlFieldsMap() fieldsMap: any,
    @GqlProjection() projection,
    @Args({ name: 'limit', nullable: true, type: () => Int }) limit: number,
    @Args({ name: 'skip', nullable: true, type: () => Int }) skip: number,
    @Args({ name: 'sort', nullable: true, type: () => String }) sort: string,
    @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
    condition: any,
  ) {
    return await this.nats
      .sendSync(RPCServices.Auth, Auth.GetManyAccessTokensQuery, {
        limit: limit,
        skip: skip,
        sort: sort,
        condition: condition,
        fieldsMap: fieldsMap,
      })
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }
}
