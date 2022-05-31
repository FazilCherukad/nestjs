import { Module } from '@nestjs/common';
import { Resolvers } from './resolvers';

@Module({
  imports: [],
  controllers: [],
  providers: [...Resolvers],
})
export class SubscriptionModule {}