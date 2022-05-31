import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
import { RPCServices } from 'ibap-common/dist/services/rpc-services';
import { Twilio } from 'ibap-common/dist/services/twilio/services';
import { Int } from 'type-graphql';
import { GraphQLJSONObject } from 'graphql-type-json';
import { DeleteDto } from '../../../common/dtos/delete.dto';
import { GraphQLError } from 'graphql';


import { ACRoles } from '../../../common/access-controll/decorators/ac-roles.decorator';
import { TokenUser } from '../../../common/authentication/decorators/tokenUser.decorator';
import { CallHistoryType } from '../types/callHistory.type';
import { UpdateCallRatingDto } from '../dtos/update-call-rating.dto';

@Resolver()
export class CommandResolver {
  constructor(private readonly nats: NatsClientService) {

  }

  @Mutation(returns => CallHistoryType)
    async updateCallRating(
    @Args('data') data: UpdateCallRatingDto,
    @TokenUser() user: any,
    ) {
        console.log('user', user)
    return await this.nats
        .sendSync(
        RPCServices.TwilioCaller, 
        Twilio.UpdateCallRatingCommand, 
        { data: data, tokenUser: user },
        )
        .catch(e => {
        console.log('e', e)
        throw new GraphQLError(e.message);
        });
    }
}
