import { Module, Global, OnModuleInit } from '@nestjs/common';
import { CacheService } from '../cache/cache.module';
import { CommandRoles, QueryRoles } from './init';
import { ACRolesGuard } from './guards/ac-roles.guard';

@Module({
  imports: [],
  providers: [],
})
export class ACModule implements OnModuleInit {
  constructor(private readonly cacheService: CacheService) {}

  onModuleInit() {
    console.log(
      '****************************** AC Init ******************************************',
    );

    // this.cacheService.cache.set("CommandRoles", CommandRoles);
    // this.cacheService.cache.set("QueryRoles", QueryRoles);
  }
}
