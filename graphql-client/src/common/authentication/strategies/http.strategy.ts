import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
import { RPCServices } from 'ibap-common/dist/services/rpc-services';
import { Auth } from 'ibap-common/dist/services/auth/services';
import { GraphQLError } from 'graphql';
// import { Roles } from '../../access-controll/init';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly nats: NatsClientService) {
    super();
  }

  validate(token: string) {
    // DEV CHECK
    return this.nats
      .sendSync(RPCServices.Auth, Auth.ValidateAuthUserCommand, {
        token: token,
      })
      .catch(e => {
        return null;
      });
  }
}
