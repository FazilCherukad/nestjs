import { SetMetadata } from '@nestjs/common';

export const ACCommand = (commandName: string) =>
  SetMetadata('commandName', commandName);
