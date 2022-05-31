import { SetMetadata } from '@nestjs/common';

export const ACRoles = (roleNames: Array<string>) =>
  SetMetadata('roleNames', roleNames);
