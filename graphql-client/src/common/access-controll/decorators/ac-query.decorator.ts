import { SetMetadata } from '@nestjs/common';

export const ACQuery = (queryName: string) =>
  SetMetadata('queryName', queryName);
