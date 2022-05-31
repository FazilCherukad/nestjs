import { Module, HttpModule } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthenticationModule } from './common/authentication/authentication.module';
import { CacheModule } from './common/cache/cache.module';
// import { ACModule } from './common/access-controll/ac.module';
import { APP_GUARD } from '@nestjs/core';
import { ACRolesGuard } from './common/access-controll/guards/ac-roles.guard';
import { GqlAuthGuard } from './common/authentication/guards/gql-auth.guard';
import { NatsClientModule } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
import { UsersModule } from './features/users/users.module';
import { AuthModule } from './features/auth/auth.module';
import { ACModule } from './common/access-controll/ac.module';
import { AuditlogModule } from './features/auditlog/auditlog.module';
import { AppController } from './features/app.controller';
import { SubscriptionModule } from './features/subscription/subscription.module';
import { ContactModule } from './features/contactus/contact.module';
import { TwilioModule } from './features/twilio/twilio.module';


@Module({
  imports: [
    CacheModule,
    AuthenticationModule,
    NatsClientModule,
    ACModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
    }),
    UsersModule,
    AuthModule,
    AuditlogModule,
    SubscriptionModule,
    ContactModule,
    TwilioModule,
    HttpModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: ACRolesGuard
    }
  ],
})
export class AppModule { }
