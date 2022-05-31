import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
import { RPCServices } from 'ibap-common/dist/services/rpc-services';
import { Subscription } from 'ibap-common/dist/services/subscription/services';
import { Int } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { DeleteDto } from '../../../common/dtos/delete.dto';
import { GraphQLError } from 'graphql';

import { CreateSubscriptionPlanDto } from '../dtos/create-subscription-plan.dto';
import { CreateUserSubscriptionDto } from '../dtos/create-user-subscription.dto';
import { UpdateSubscriptionPlanDto } from '../dtos/update-subscription-plan.dto';

import { SubscriptionPlanType } from '../types/subscriptionPlan.type';
import { UserSubscriptionType } from '../types/userSubscription.type';

import { ACRoles } from '../../../common/access-controll/decorators/ac-roles.decorator';
import { TokenUser } from '../../../common/authentication/decorators/tokenUser.decorator';
import { CompeleteUserSubscriptionDto } from '../dtos/compeleteUserSubscription.dto';
import { FreePlanType } from '../types/freePlan.type';
import { CreateFreePlanDto } from '../dtos/create-free-plan.dto';
import { UpdateFreePlanDto } from '../dtos/update-free-plan.dto';
import { UpdateUserWalletByAdminDto } from '../dtos/update-user-wallet-by-admin.dto';

@Resolver()
export class CommandResolver {
  constructor(private readonly nats: NatsClientService) {}

  // Message_Patterns

  // -------------------------  Subscription plan ------------------------------------------ //

  //@ACRoles(['Admin', 'SuperAdmin'])
  @Mutation(returns => SubscriptionPlanType)
  async createSubscriptionPlan(
    @Args('data') data: CreateSubscriptionPlanDto,
    @TokenUser() user: any,
    ) {
      console.log('user', user)
    return await this.nats
      .sendSync(
        RPCServices.Subscription, 
        Subscription.CreateSubscriptionPlanCommand, 
        { data: data, tokenUser: user },
      )
      .catch(e => {
        console.log('e', e)
        throw new GraphQLError(e.message);
      });
  }

  //@ACRoles(['Admin', 'SuperAdmin'])
  @Mutation(returns => SubscriptionPlanType)
  async updateSubscriptionPlan(
    @Args('data') data: UpdateSubscriptionPlanDto,
    @TokenUser() user: any,

    ) {
    return await this.nats
      .sendSync(
        RPCServices.Subscription, 
        Subscription.UpdateSubscriptionPlanCommand, 
        { data: data, tokenUser: user },
      )
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  //@ACRoles(['Admin', 'SuperAdmin'])
  @Mutation(returns => SubscriptionPlanType)
  async deleteSubscriptionPlan(
    @Args('data') data: DeleteDto,
    @TokenUser() user: any,
    ) {
    return await this.nats
      .sendSync(
        RPCServices.Subscription, 
        Subscription.DeleteSubscriptionPlanCommand, 
        { data: data, tokenUser: user },
      )
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  // -------------------------  User Subscription ------------------------------------------ //

  //@ACRoles(['Admin', 'SuperAdmin'])
  @Mutation(returns => UserSubscriptionType)
  async createUserSubscription(
    @Args('data') data: CreateUserSubscriptionDto,
    @TokenUser() user: any,
    ) {
    return await this.nats
      .sendSync(
        RPCServices.Subscription, 
        Subscription.CreateUserSubscriptionCommand, 
        { data: data, tokenUser: user },
      )
      .catch(e => {
        console.log('e', e)
        throw new GraphQLError(e.message);
      });
  }

    //@ACRoles(['Admin', 'SuperAdmin'])
    @Mutation(returns => UserSubscriptionType)
    async compeleteUserSubscription(
      @Args('data') data: CompeleteUserSubscriptionDto,
      @TokenUser() user: any,
      ) {
      return await this.nats
        .sendSync(
          RPCServices.Subscription, 
          Subscription.CompleteUserSubscriptionCommand, 
          { data: data, tokenUser: user },
        )
        .catch(e => {
          console.log('e', e)
          throw new GraphQLError(e.message);
        });
    }

      //@ACRoles(['Admin', 'SuperAdmin'])
  @Mutation(returns => UserSubscriptionType)
  async updateUserSubscriptionByAdmin(
    @Args('data') data: UpdateUserWalletByAdminDto,
    @TokenUser() user: any,
    ) {
    return await this.nats
      .sendSync(
        RPCServices.Subscription, 
        Subscription.UpdateCustomerWalletByAdminCommand, 
        { data: data, tokenUser: user },
      )
      .catch(e => {
        console.log('e', e)
        throw new GraphQLError(e.message);
      });
  }


  // -------------------------  Free Plans ------------------------------------------ //

  //@ACRoles(['Admin', 'SuperAdmin'])
  @Mutation(returns => FreePlanType)
  async createFreePlan(
    @Args('data') data: CreateFreePlanDto,
    @TokenUser() user: any,
    ) {
    return await this.nats
      .sendSync(
        RPCServices.Subscription, 
        Subscription.CreateFreePlanCommand, 
        { data: data, tokenUser: user },
      )
      .catch(e => {
        console.log('e', e)
        throw new GraphQLError(e.message);
      });
  }

  //@ACRoles(['Admin', 'SuperAdmin'])
  @Mutation(returns => FreePlanType)
  async updateFreePlan(
    @Args('data') data: UpdateFreePlanDto,
    @TokenUser() user: any,

    ) {
    return await this.nats
      .sendSync(
        RPCServices.Subscription, 
        Subscription.UpdateFreePlanCommand, 
        { data: data, tokenUser: user },
      )
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

  //@ACRoles(['Admin', 'SuperAdmin'])
  @Mutation(returns => FreePlanType)
  async deleteFreePlan(
    @Args('data') data: DeleteDto,
    @TokenUser() user: any,
    ) {
    return await this.nats
      .sendSync(
        RPCServices.Subscription, 
        Subscription.DeleteFreePlanCommand, 
        { data: data, tokenUser: user },
      )
      .catch(e => {
        throw new GraphQLError(e.message);
      });
  }

}
