import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './features/auth/auth.module';
import { NatsClientModule } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
import { MongoDbModule } from 'ibap-common/dist/common/databases/mongo-db.modules';
@Module({
  imports: [
    NatsClientModule,
    MongoDbModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
