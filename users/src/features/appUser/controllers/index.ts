import { CommandController } from './command.controller';
import { QueryController } from './query.controller';
import { MediaCommandController } from './http/media.controller';

export const RpcControllers = [CommandController, QueryController];

export const HttpControllers = [MediaCommandController];
