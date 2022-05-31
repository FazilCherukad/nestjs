import { createParamDecorator } from '@nestjs/common';
import { fieldsMap } from 'graphql-fields-list';

export const GqlFieldsMap = createParamDecorator(
  (options, [root, args, ctx, info]) => {
    return fieldsMap(info, options);
  },
);
