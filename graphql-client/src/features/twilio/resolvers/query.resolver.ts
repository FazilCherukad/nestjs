import { Resolver, Args, Query } from '@nestjs/graphql';
import { Int } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
import { GqlFieldsMap } from 'ibap-common/dist/common/decorators/gql-fields-map.decorator';
import { GqlProjection } from 'ibap-common/dist/common/decorators/gql-projection.decorator';
import { RPCServices } from 'ibap-common/dist/services/rpc-services';
import { Twilio } from 'ibap-common/dist/services/twilio/services';
import { TokenUser } from '../../../common/authentication/decorators/tokenUser.decorator';
import { GraphQLError } from 'graphql';
import { CallHistoryType } from '../types/callHistory.type'
import { CallHistoryLogType } from '../types/callHistoryLog.type';

@Resolver()
export class QueryResolver {
  constructor(private readonly nats: NatsClientService) {}

  // Message_Patterns

  // -------------------------  History ------------------------------------------ //

 
   @Query(returns => [CallHistoryType])
   async getManyCallHistories(
     @GqlFieldsMap() fieldsMap: any,
     @GqlProjection() projection,
     @Args({ name: 'limit', nullable: true, type: () => Int }) limit: number,
     @Args({ name: 'skip', nullable: true, type: () => Int }) skip: number,
     @Args({ name: 'sort', nullable: true, type: () => String }) sort: string,
     @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
     condition: any,
   ) {
     return await this.nats
       .sendSync(RPCServices.TwilioCaller, Twilio.GetManyCallHistoryQuery, {
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
   async GetCallHistoriesCount(
     @GqlFieldsMap() fieldsMap: any,
     @GqlProjection() projection,
     @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
     condition: any,
   ) {
     
     return await this.nats
       .sendSync(RPCServices.TwilioCaller, Twilio.GetCallHistoryCountQuery, {
         condition: condition,
         fieldsMap: fieldsMap,
       })
       .catch(e => {
         throw new GraphQLError(e.message);
       });
   }

   @Query(returns => CallHistoryType, { nullable: true })
  async getOneCallHistory(
    @GqlFieldsMap() fieldsMap: any,
    @GqlProjection() projection,
    @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
    condition: any,
  ) {
    return await this.nats
      .sendSync(RPCServices.TwilioCaller, Twilio.GetOneCallHistoryQuery, {
        condition: condition,
        fieldsMap: fieldsMap,
      })
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

   @Query(returns => [CallHistoryLogType])
   async getManyCallLogsHistories(
     @GqlFieldsMap() fieldsMap: any,
     @GqlProjection() projection,
     @Args({ name: 'limit', nullable: true, type: () => Int }) limit: number,
     @Args({ name: 'skip', nullable: true, type: () => Int }) skip: number,
     @Args({ name: 'sort', nullable: true, type: () => String }) sort: string,
     @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
     condition: any,
   ) {
     return await this.nats
       .sendSync(RPCServices.TwilioCaller, Twilio.GetManyCallHstoryLogsQuery, {
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
