import { AggregateRoot } from '@nestjs/cqrs';
import { flakeId } from 'ibap-common/dist/common/snippets/flake-idgen';
import { RepositoryCollection } from '../repositories';
import { RPCServices } from 'ibap-common/dist/services/rpc-services';
import { Auth } from 'ibap-common/dist/services/auth/services';
import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';

export class AppUser extends AggregateRoot {
  id: string;
  repos: RepositoryCollection;
  nats: NatsClientService;

  constructor(repos, id?) {
    super();
    this.id = id;
    this.repos = repos;
  }

  async create(dto: any) {
    // check if previous user with same username
    var authUser = await this.nats.sendSync(
      RPCServices.Auth,
      Auth.GetOneAuthUserQuery,
      {
        condition: { username: dto.username },
        fieldsMap: {},
      },
    );
    if (authUser){
      const prevUser = await this.repos.appUserModel.find({authUser: authUser.id})
      if(prevUser && prevUser.length > 0)throw new Error('username_already_registered');
    }else{
        // create AuthUser
      authUser = await this.nats.sendSync(
          RPCServices.Auth,
          Auth.CreateAuthUserCommand,
          {
            fId: flakeId(),
            firstName: dto.firstName,
            lastName: dto.lastName,
            username: dto.username,
            email: dto.email,
            mobile: dto.mobile,
            password: 'customer',
            roles: ['AppUser'],
          },
        );
    } 

    const code = await this.generateCustomerCode()
    let d = Object.assign({}, dto, { authUser: authUser.id, fId: flakeId(), customer_code:code });
    const state = await this.repos.appUserModel.create(d);
    return state;
  }

  async update(dto) {
    let d: any = Object.assign({}, dto);
    if (d.avatar) d = Object.assign({}, d, { $inc: { avatarVer: 1 } });
    const appUser = await this.repos.appUserModel.findByIdAndUpdate(dto.id, d, {
      new: true,
    });
    const authUser = await this.nats.sendSync(
      RPCServices.Auth,
      Auth.UpdateAuthUserCommand,
      Object.assign({}, dto, { id: appUser.authUser }),
    );
    let appUserJson = appUser.toJSON();
    let resp = Object.assign({}, appUserJson, { authUser: authUser });
    console.log('update.............', resp);
    return resp;
  }

  async updateImage(file: any) {
    console.log('.........', file);
    if (!file) throw new Error('file_not_found');
    const l = global['config'].PUBLIC_FOLDER.length;
    let path = file.path.substring(l);

    const resp = await this.repos.appUserModel.findByIdAndUpdate(
      this.id,
      { image: path },
      { new: true },
    );
    console.log('reach inside model..... ', resp);
    return resp;
  }

  async delete() {
    await this.repos.appUserModel.deleteById(this.id);
    let state = await this.repos.appUserModel.findOneDeleted({ _id: this.id });
    return state;
  }

  async updatePassword(dto) {
    console.log('reach model.............');

    let condition = { code: dto.code, mobileNo: dto.mobileNo };
    let user: any = await this.repos.mobileverificationModel.findOne(condition);
    if (!user) throw new Error('invalid_verification');
    // console.log("mobileN//////////////////////////////////////////", user.mobileNo);

    let authUser = await this.nats.sendSync(
      RPCServices.Auth,
      Auth.GetOneAuthUserQuery,
      { condition: { mobile: user.mobileNo } },
    );
    if (!authUser) throw new Error('user_doesnt_exist');
    let updatedPassword = await this.nats.sendSync(
      RPCServices.Auth,
      Auth.UpdatePasswordCommand,
      {
        id: authUser.id,
        password: dto.password,
      },
    );
    return updatedPassword;
  }

  async generateCustomerCode(){
    const prefix = "T";
    const user = await this.repos.appUserModel.findOne().sort({_id: -1})
    var user_code_number = 1;
    if(user && user.customer_code){
      user_code_number = parseInt(user.customer_code.replace(prefix, '')) + 1
    }
    return prefix+user_code_number
  }
}
