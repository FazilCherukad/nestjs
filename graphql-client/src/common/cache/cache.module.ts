import { Module, Global, Injectable } from '@nestjs/common';
import * as NodeCache from 'node-cache';

@Injectable()
export class CacheService {
  public cache;

  constructor() {
    this.cache = new NodeCache();
  }
}

@Global()
@Module({
  imports: [],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
