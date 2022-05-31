import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { CommandRoles, Roles } from '../init';
import { CacheService } from '../../cache/cache.module';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class ACCommandGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly cacheService: CacheService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const commandName = this.reflector.get<string>(
      'commandName',
      context.getHandler(),
    );
    if (!commandName) return true;
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    if (!user || !user.roles || !user.roles.length) return false;
    if (user.roles.includes(Roles.SuperAdmin)) return true;
    if (
      this.cacheService.cache
        .get('CommandRoles')
        [commandName].some(r => user.roles.includes(r))
    )
      return true;
    return false;
  }
}
