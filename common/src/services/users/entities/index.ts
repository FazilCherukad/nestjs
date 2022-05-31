import { UsersMobileVerificationSchema } from './mobileVerification/mobileVerification.schema';
import { UsersAppUserSchema } from './appUser/appUser.schema';
import { UsersExecutiveUserSchema } from './executiveUser/executiveUser.schema';


export const Entities = [
  { name: 'UsersMobileVerification', schema: UsersMobileVerificationSchema },
  { name: 'UsersAppUser', schema: UsersAppUserSchema },
  { name: 'UsersExecutiveUser', schema: UsersExecutiveUserSchema },
];
