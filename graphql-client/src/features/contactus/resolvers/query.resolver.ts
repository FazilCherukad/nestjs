import { Resolver, Args, Query } from '@nestjs/graphql';
import { Int } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
import { GqlFieldsMap } from 'ibap-common/dist/common/decorators/gql-fields-map.decorator';
import { GqlProjection } from 'ibap-common/dist/common/decorators/gql-projection.decorator';
import { RPCServices } from 'ibap-common/dist/services/rpc-services';
import { ContactUs } from 'ibap-common/dist/services/contactUs/services';
import { GraphQLError } from 'graphql';
import { ContactPageType } from '../types/contactPage.type';
import { AppVersionType } from '../types/appVersion.type';

@Resolver()
export class QueryResolver {
  constructor(private readonly nats: NatsClientService) {}

  // Message_Patterns

  // -------------------------  Client ------------------------------------------ //

  @Query(returns => ContactPageType)
  async getOneContactPage(
    @GqlFieldsMap() fieldsMap: any,
    @GqlProjection() projection,
    @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
    condition: any,
  ) {
    return await this.nats
      .sendSync(RPCServices.ContactUs, ContactUs.GetOneContactUsPageQuery, {
        condition: condition,
        fieldsMap: fieldsMap,
      })
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  @Query(returns => [ContactPageType])
  async getManyContactPages(
    @GqlFieldsMap() fieldsMap: any,
    @GqlProjection() projection,
    @Args({ name: 'limit', nullable: true, type: () => Int }) limit: number,
    @Args({ name: 'skip', nullable: true, type: () => Int }) skip: number,
    @Args({ name: 'sort', nullable: true, type: () => String }) sort: string,
    @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
    condition: any,
  ) {
    return await this.nats
      .sendSync(RPCServices.ContactUs, ContactUs.GetManyContactUsPagesQuery, {
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

  // -------------------------  Client ------------------------------------------ //

  @Query(returns => AppVersionType)
  async getOneAppVersion(
    @GqlFieldsMap() fieldsMap: any,
    @GqlProjection() projection,
    @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
    condition: any,
  ) {
    return await this.nats
      .sendSync(RPCServices.ContactUs, ContactUs.GetOneAppVersionQuery, {
        condition: condition,
        fieldsMap: fieldsMap,
      })
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  @Query(returns => [AppVersionType])
  async getManyAppVersions(
    @GqlFieldsMap() fieldsMap: any,
    @GqlProjection() projection,
    @Args({ name: 'limit', nullable: true, type: () => Int }) limit: number,
    @Args({ name: 'skip', nullable: true, type: () => Int }) skip: number,
    @Args({ name: 'sort', nullable: true, type: () => String }) sort: string,
    @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
    condition: any,
  ) {
    return await this.nats
      .sendSync(RPCServices.ContactUs, ContactUs.GetManyAppVersionsQuery, {
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


  @Query(returns => String, { nullable: true })
  async GetAppVersionCount(
    @GqlFieldsMap() fieldsMap: any,
    @GqlProjection() projection,
    @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
    condition: any,
  ) {
    
    return await this.nats
      .sendSync(RPCServices.ContactUs, ContactUs.GetAppVersionsCountQuery, {
        condition: condition,
        fieldsMap: fieldsMap,
      })
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }



}
