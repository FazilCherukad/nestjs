import { createParamDecorator } from '@nestjs/common';

export const TokenUser = createParamDecorator(
  (data, [root, args, ctx, info]) => ctx.req.user,
);
