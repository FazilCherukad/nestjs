import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  console.log('bootstarp call')
  global['config'] = await dotenv.config().parsed;
  

  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log('bootstarp call2')

  app.connectMicroservice({
    transport: Transport.NATS,
    options: {
      url: global['config'].NATS_URL,
      maxReconnectAttempts: -1,
      //@ts-ignore
      // waitOnFirstConnect: true,
      queue: `${global['config'].APP_NAME}-${global['config'].NODE_ENV}`,
    },
  });

  console.log(global['config'].PORT)

  process.title = global['config'].APP_NAME;
  // await app.startAllMicroservicesAsync();
  console.log('bootstarp call3')
  app.setGlobalPrefix(`${global['config'].APP_NAME}`);
  console.log('bootstarp call4')
  await app.listen(global['config'].PORT,);
  console.log('listening on..');
  
}
bootstrap();
