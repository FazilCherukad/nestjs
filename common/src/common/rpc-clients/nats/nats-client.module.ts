import { Module, Global, Inject, Injectable } from '@nestjs/common';
import {
  ClientProxyFactory,
  Transport,
  ClientProxy,
} from '@nestjs/microservices';

@Injectable()
export class NatsClientService {
  constructor(@Inject('NATS') private client: ClientProxy) {}

  sendAsync(service, command, data = {}) {
    return this.client.send({ service: service, cmd: command }, data);
  }

  sendSync(service, command, data = {}) {
    return this.client
      .send({ service: service, cmd: command }, data)
      .toPromise();
  }

  publish(service, event, data) {
    this.client.emit({ service: service, event: event }, data);
  }
}

const natsClientFactory = {
  provide: 'NATS',
  useFactory: () => {
    return ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        url: global['config'].NATS_URL,
        maxReconnectAttempts: -1,
        //@ts-ignore
        waitOnFirstConnect: true,
      },
    });
  },
};

@Global()
@Module({
  providers: [natsClientFactory, NatsClientService],
  exports: [natsClientFactory, NatsClientService],
})
export class NatsClientModule {
  constructor(@Inject('NATS') private client: ClientProxy) {}

  async onModuleInit() {
    this.client.connect().catch(e => {
      console.log(e);
    });
  }
}
