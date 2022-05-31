import { GetOneAccessTokenHandler } from './accessToken/get-one-accessToken.query';
import { GetManyAccessTokensHandler } from './accessToken/get-many-accessTokens.query';

import { GetOneAuthUserHandler } from './authUser/get-one-authUser.query';
import { GetManyAuthUsersHandler } from './authUser/get-many-authUsers.query';

import { GetOneClientHandler } from './client/get-one-client.query';
import { GetManyClientsHandler } from './client/get-many-clients.query';
export const QueryHandlers = [
  //

  GetOneClientHandler,
  GetManyClientsHandler,

  GetOneAuthUserHandler,
  GetManyAuthUsersHandler,

  GetOneAccessTokenHandler,
  GetManyAccessTokensHandler,
];
