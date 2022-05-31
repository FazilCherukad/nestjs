import { ModelPlus } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { IAuthAccessTokenDoc } from 'ibap-common/dist/services/auth/entities/accessToken/accessToken.interface';

import { IAuthAuthUserDoc } from 'ibap-common/dist/services/auth/entities/authUser/authUser.interface';

import { IAuthClientDoc } from 'ibap-common/dist/services/auth/entities/client/client.interface';
export class RepositoryCollection {
  constructor(
    //

    @InjectModel('AuthClient')
    public readonly clientModel: ModelPlus<IAuthClientDoc>,

    @InjectModel('AuthAuthUser')
    public readonly authUserModel: ModelPlus<IAuthAuthUserDoc>,

    @InjectModel('AuthAccessToken')
    public readonly accessTokenModel: ModelPlus<IAuthAccessTokenDoc>,
  ) {}
}
