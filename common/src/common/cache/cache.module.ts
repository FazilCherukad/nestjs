import { Injectable, Global, Module } from '@nestjs/common';
import * as NodeCache from 'node-cache';

@Injectable()
export class cacheService {
  public cache;

  constructor() {
    this.cache = new NodeCache();
  }
}

@Global()
@Module({
  imports: [],
  providers: [cacheService],
})
export class CacheModule {}
