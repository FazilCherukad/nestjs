import { CreateAccessTokenHandler } from './accessToken/create-accessToken.command';
import { UpdateAccessTokenHandler } from './accessToken/update-accessToken.command';
import { DeleteAccessTokenHandler } from './accessToken/delete-accessToken.command';

import { CreateAuthUserHandler } from './authUser/create-authUser.command';
import { UpdateAuthUserHandler } from './authUser/update-authUser.command';
import { DeleteAuthUserHandler } from './authUser/delete-authUser.command';

import { CreateClientHandler } from './client/create-client.command';
import { UpdateClientHandler } from './client/update-client.command';
import { DeleteClientHandler } from './client/delete-client.command';
import { UpdatePasswordHandler } from './authUser/update-password.command';
import { ValidateAuthUserHandler } from './authUser/validate-authUser.command';
import { LoginHandler } from './authUser/login.command';
import { AttachRoleHandler } from './authUser/attach-role.command';
export const CommandHandlers = [
  //

  CreateClientHandler,
  UpdateClientHandler,
  DeleteClientHandler,

  CreateAuthUserHandler,
  UpdateAuthUserHandler,
  DeleteAuthUserHandler,

  CreateAccessTokenHandler,
  UpdateAccessTokenHandler,
  DeleteAccessTokenHandler,

  UpdatePasswordHandler,
  ValidateAuthUserHandler,

  LoginHandler,
  AttachRoleHandler,
];
