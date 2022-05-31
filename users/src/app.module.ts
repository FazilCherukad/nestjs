import { Module } from '@nestjs/common';
import { MongoDbModule } from 'ibap-common/dist/common/databases/mongo-db.modules';
import { NatsClientModule } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
import { appUserModule } from './features/appUser/appUser.module';
import { ExecutiveUserModule } from './features/executiveUser/executiveUser.module';
import { MailerModule } from '@nest-modules/mailer';
// import { UsersModule } from './features/users/users.module';

@Module({
  imports: [
    MongoDbModule,
    NatsClientModule,
    appUserModule,
    ExecutiveUserModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: `${global['config'].SMTP_CONFIG}`,
        defaults: {
          from: '"sa" <noreply@user.com>',
        },
      }),
      // transport: 'smtps://apikey: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@smtp.sendgrid.net',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
