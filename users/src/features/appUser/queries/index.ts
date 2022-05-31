import { GetManyMobileverificationsHandler } from './mobileVerification/get-many-mobileverifications.query';
import { GetOneMobileverificationHandler } from './mobileVerification/get-one-mobileverification.query';
import { GetAppUserRolesQuery, GetAppUserRolesQueryHandler } from './appUser/get-appUser-roles.query';
import { GetManyAppUserHandler } from './appUser/get-many-appUsers.query';
import { GetOneAppUserHandler } from './appUser/get-one-appUser.query';
import { GetAppUserCountHandler } from './appUser/get-appUser-count.query';
import { GetMobileVerificationsCountHandler } from './mobileVerification/get-mobileverification-count.query';

export const QueryHandlers = [

  GetManyMobileverificationsHandler,
  GetOneMobileverificationHandler,
  GetMobileVerificationsCountHandler,

  GetAppUserRolesQuery,

  GetManyAppUserHandler ,
  GetOneAppUserHandler ,
  GetAppUserRolesQueryHandler,
  GetAppUserCountHandler,



];
