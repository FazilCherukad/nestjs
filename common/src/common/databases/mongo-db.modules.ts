import { Module, Global, OnModuleInit } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: global['config'].MONGO_DB,
        useNewUrlParser: true,
        auto_reconnect: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        poolSize: 20,
        socketTimeoutMS: 480000,
        keepAlive: true,
        autoIndex: global['config'].MONGO_DB_INDEX == 'true' ? true : false,
      }),
    }),
  ],
})
export class MongoDbModule implements OnModuleInit {
  onModuleInit() {
    mongoose.set('debug', true);
    console.log(global['config'].MONGO_DB);
  }
}
