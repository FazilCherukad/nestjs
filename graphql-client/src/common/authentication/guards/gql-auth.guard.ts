import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlAuthGuard extends AuthGuard('bearer') {
  getRequest(context: ExecutionContext) {

    //Check if REST request
    if (context.switchToHttp().getRequest()) return context.switchToHttp().getRequest();

    // For GraphQL request
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    return req;
  }
}
