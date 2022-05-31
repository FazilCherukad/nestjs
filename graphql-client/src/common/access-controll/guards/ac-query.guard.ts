import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Roles, QueryRoles } from '../init';
import { CacheService } from '../../cache/cache.module';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class ACQueryGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly cacheService: CacheService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const queryName = this.reflector.get<string>(
      'queryName',
      context.getHandler(),
    );
    if (!queryName) return true;
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    if (!user || !user.roles || !user.roles.length) return false;
    if (user.roles.includes(Roles.SuperAdmin)) return true;
    if (
      this.cacheService.cache
        .get('QueryRoles')
        [queryName].some(r => user.roles.includes(r))
    )
      return true;
    return false;
  }
}
