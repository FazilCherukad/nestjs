import { createParamDecorator } from '@nestjs/common';
import { fieldsProjection } from 'graphql-fields-list';

export const GqlProjection = createParamDecorator(
  (options, [root, args, ctx, info]) => {
    return fieldsProjection(info, options);
  },
);
