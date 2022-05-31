import { DeleteAppUserHandler } from "./appUser/delete-appUser.command";
import { CreateAppUserHandler } from "./appUser/create-appUser.command";
import { UpdateAppUserHandler } from "./appUser/update-appUser.command";

import { CreateMobileverificationHandler } from './mobileVerification/create-mobileverification.command';
import { DeleteMobileverificationHandler } from './mobileVerification/delete-mobileVerification.command';
import { UpdateMobileverificationHandler } from './mobileVerification/update-mobileVerification.command';

import { UpdateAppUserImageHandler } from "./appUser/update-image.command";
import { UpdateAppUserPasswordHandler } from "./appUser/update-appUser-password.command";
import { VerifyOtpHandler } from "./mobileVerification/verify-otp.command";
import { AppUserLoginHandler } from "./appUser/login-appUser.command";


export const CommandHandlers = [
  //
  CreateAppUserHandler,
  DeleteAppUserHandler,
  UpdateAppUserHandler,
  AppUserLoginHandler,


  UpdateAppUserImageHandler,

  UpdateAppUserPasswordHandler,

  CreateMobileverificationHandler,
  DeleteMobileverificationHandler,
  UpdateMobileverificationHandler,
  VerifyOtpHandler

];
