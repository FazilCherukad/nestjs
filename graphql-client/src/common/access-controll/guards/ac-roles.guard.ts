import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Roles } from '../init';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class ACRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roleNames = this.reflector.get<Array<string>>(
      'roleNames',
      context.getHandler(),
    );
    if (!roleNames || !roleNames.length) return true;
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    if (!user || !user.roles || !user.roles.length) return false;
    if (user.roles.includes(Roles.SuperAdmin)) return true;
    if (roleNames.some(r => user.roles.includes(r))) return true;
    return false;
  }
}
