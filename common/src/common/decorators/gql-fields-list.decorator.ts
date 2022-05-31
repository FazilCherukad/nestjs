import { createParamDecorator } from '@nestjs/common';
import { fieldsList } from 'graphql-fields-list';

export const GqlFieldsList = createParamDecorator(
  (options, [root, args, ctx, info]) => {
    return fieldsList(info, options);
  },
);
