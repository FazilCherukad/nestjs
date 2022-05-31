import { AuthAccessTokenSchema } from './accessToken/accessToken.schema';
import { AuthAuthUserSchema } from './authUser/authUser.schema';
import { AuthClientSchema } from './client/client.schema';

export const Entities = [
  { name: 'AuthAccessToken', schema: AuthAccessTokenSchema },
  { name: 'AuthAuthUser', schema: AuthAuthUserSchema },
  { name: 'AuthClient', schema: AuthClientSchema },
];
