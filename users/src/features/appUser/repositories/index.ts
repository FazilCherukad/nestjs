import { ModelPlus } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { IUsersAppUserDoc } from 'ibap-common/dist/services/users/entities/appUser/appUser.interface';
import { IUsersExecutiveUserDoc } from 'ibap-common/dist/services/users/entities/executiveUser/executiveUser.interface';
import { IUsersMobileVerificationDoc } from 'ibap-common/dist/services/users/entities/mobileVerification/mobileVerification.interface';

export class RepositoryCollection {
  constructor(
    //

    @InjectModel('UsersAppUser')
    public readonly appUserModel: ModelPlus<IUsersAppUserDoc>,

    @InjectModel('UsersExecutiveUser')
    public readonly executiveUserModel: ModelPlus<IUsersExecutiveUserDoc>,
     
   
     @InjectModel('UsersMobileVerification')
    public readonly mobileverificationModel: ModelPlus<
      IUsersMobileVerificationDoc
    >,
  ) {}
}
