import { Resolver, Args, Query } from '@nestjs/graphql';
import { Int } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
import { GqlFieldsMap } from 'ibap-common/dist/common/decorators/gql-fields-map.decorator';
import { GqlProjection } from 'ibap-common/dist/common/decorators/gql-projection.decorator';
import { RPCServices } from 'ibap-common/dist/services/rpc-services';
import { Subscription } from 'ibap-common/dist/services/subscription/services';
import { TokenUser } from '../../../common/authentication/decorators/tokenUser.decorator';
import { GraphQLError } from 'graphql';


import { SubscriptionPlanType } from '../types/subscriptionPlan.type';
import { UserWalletType } from '../types/userWallet.type';
import { FreePlanType } from '../types/freePlan.type';
import { CoinType } from '../types/coinType.type';
import { UserSubscriptionType } from '../types/userSubscription.type';
import { AdminDashboardType } from '../types/adminDashboard.type';

@Resolver()
export class QueryResolver {
  constructor(private readonly nats: NatsClientService) {}

  // Message_Patterns

  // -------------------------  Subscription Plan ------------------------------------------ //

  @Query(returns => String, { nullable: true })
  async GetSubscriptionPlansCount(
    @GqlFieldsMap() fieldsMap: any,
    @GqlProjection() projection,
    @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
    condition: any,
  ) {
    
    return await this.nats
      .sendSync(RPCServices.Subscription, Subscription.GetSubscriptionPlansCountQuery, {
        condition: condition,
        fieldsMap: fieldsMap,
      })
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  @Query(returns => SubscriptionPlanType, { nullable: true })
  async getOneSubscriptionPlan(
    @GqlFieldsMap() fieldsMap: any,
    @GqlProjection() projection,
    @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
    condition: any,
  ) {
    return await this.nats
      .sendSync(RPCServices.Subscription, Subscription.GetOneSubscriptionPlanQuery, {
        condition: condition,
        fieldsMap: fieldsMap,
      })
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  @Query(returns => [SubscriptionPlanType])
  async getManySubscriptionPlans(
    @GqlFieldsMap() fieldsMap: any,
    @GqlProjection() projection,
    @Args({ name: 'limit', nullable: true, type: () => Int }) limit: number,
    @Args({ name: 'skip', nullable: true, type: () => Int }) skip: number,
    @Args({ name: 'sort', nullable: true, type: () => String }) sort: string,
    @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
    condition: any,
  ) {
    return await this.nats
      .sendSync(RPCServices.Subscription, Subscription.GetManySubscriptionPlansQuery, {
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

  @Query(returns => UserWalletType, { nullable: true })
  async getOneUserWallet(
    @GqlFieldsMap() fieldsMap: any,
    @GqlProjection() projection,
    @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
    condition: any,
  ) {
    return await this.nats
      .sendSync(RPCServices.Subscription, Subscription.GetOneUserWalletQuery, {
        condition: condition,
        fieldsMap: fieldsMap,
      })
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  @Query(returns => CoinType, { nullable: true })
  async getTotalUserCoins(
    @GqlFieldsMap() fieldsMap: any,
    @GqlProjection() projection,
    @TokenUser() user: any,
    @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
    condition: any,
  ) {
    return await this.nats
      .sendSync(RPCServices.Subscription, Subscription.GetTotalUserCoinsQuery, {
        condition: {...condition, authUser: user.id},
        fieldsMap: fieldsMap,
      })
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }


  @Query(returns => CoinType, { nullable: true })
  async getTotalExecutiveCoins(
    @GqlFieldsMap() fieldsMap: any,
    @GqlProjection() projection,
    @TokenUser() user: any,
    @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
    condition: any,
  ) {
    return await this.nats
      .sendSync(RPCServices.Subscription, Subscription.GetTotalExecutiveCoinsQuery, {
        condition: { authUser: user.id, ...condition},
        fieldsMap: fieldsMap,
      })
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

   // -------------------------  Free Plans ------------------------------------------ //

   @Query(returns => String, { nullable: true })
   async GetFreePlansCount(
     @GqlFieldsMap() fieldsMap: any,
     @GqlProjection() projection,
     @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
     condition: any,
   ) {
     
     return await this.nats
       .sendSync(RPCServices.Subscription, Subscription.GetFreePlansCountQuery, {
         condition: condition,
         fieldsMap: fieldsMap,
       })
       .catch(e => {
         throw new GraphQLError(e.message);
       });
   }
 
   @Query(returns => FreePlanType, { nullable: true })
   async getOneFreePlan(
     @GqlFieldsMap() fieldsMap: any,
     @GqlProjection() projection,
     @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
     condition: any,
   ) {
     return await this.nats
       .sendSync(RPCServices.Subscription, Subscription.GetOneFreePlanQuery, {
         condition: condition,
         fieldsMap: fieldsMap,
       })
       .catch(e => {
         throw new GraphQLError(e.message);
       });
   }
 
   @Query(returns => [FreePlanType])
   async getManyFreePlans(
     @GqlFieldsMap() fieldsMap: any,
     @GqlProjection() projection,
     @Args({ name: 'limit', nullable: true, type: () => Int }) limit: number,
     @Args({ name: 'skip', nullable: true, type: () => Int }) skip: number,
     @Args({ name: 'sort', nullable: true, type: () => String }) sort: string,
     @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
     condition: any,
   ) {
     return await this.nats
       .sendSync(RPCServices.Subscription, Subscription.GetManyFreePlansQuery, {
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

   @Query(returns => [UserSubscriptionType])
  async getManyUserSubscription(
    @GqlFieldsMap() fieldsMap: any,
    @GqlProjection() projection,
    @Args({ name: 'limit', nullable: true, type: () => Int }) limit: number,
    @Args({ name: 'skip', nullable: true, type: () => Int }) skip: number,
    @Args({ name: 'sort', nullable: true, type: () => String }) sort: string,
    @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
    condition: any,
  ) {
    return await this.nats
      .sendSync(RPCServices.Subscription, Subscription.GetManyUserSubscriptionsQuery, {
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
  async GetUserSubscriptionsCount(
    @GqlFieldsMap() fieldsMap: any,
    @GqlProjection() projection,
    @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
    condition: any,
  ) {
    return await this.nats
      .sendSync(RPCServices.Subscription, Subscription.GetUserSubscriptionsCountQuery, {
        condition: condition,
        fieldsMap: fieldsMap,
      })
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  @Query(returns => AdminDashboardType, { nullable: true })
  async getAdminDashboard(
    @GqlFieldsMap() fieldsMap: any,
    @GqlProjection() projection,
    @TokenUser() user: any,
    @Args({ name: 'condition', nullable: true, type: () => GraphQLJSONObject })
    condition: any,
  ) {
    return await this.nats
      .sendSync(RPCServices.Subscription, Subscription.GetAdminDashboardQuery, {
        condition: { authUser: user.id, ...condition},
        fieldsMap: fieldsMap,
      })
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  
}
