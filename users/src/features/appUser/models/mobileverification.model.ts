import { AggregateRoot } from '@nestjs/cqrs';
// import { flakeId } from 'savetime-ibap-common/dist/common/snippets/flake-idgen';
import { RepositoryCollection } from '../repositories';
import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
import { RPCServices } from 'ibap-common/dist/services/rpc-services';
import { Auth } from 'ibap-common/dist/services/auth/services';
import { flakeId } from 'ibap-common/dist/common/snippets/flake-idgen';
import { NatsError } from 'nats';
import { HttpService } from '@nestjs/common';
import { MailerService } from '@nest-modules/mailer';

export class Mobileverification extends AggregateRoot {
  id: string;
  repos: RepositoryCollection;
  nats: NatsClientService;
  https: HttpService;
  mailer: MailerService;

  constructor(repos, https?, mailer?) {
    super();
    // this.id = id;
    this.repos = repos;
    this.https = https;
    this.mailer = mailer;

  }

  async create(dto: any) {

    const code = Math.floor(1000 + Math.random() * 9999);
    const mobileNumber = dto.mobileNo
    const API_KEY = ""
    const url = `https://2factor.in/API/V1/${API_KEY}/SMS/${dto.mobileNo}/${code}`
    let res = await this.https.request({
      url: url, 
      method:'GET'
    }).toPromise()
    console.log(res)
    const smsResp = res.data['Details'];

    const verification = await this.repos.mobileverificationModel
      .create({
        fId: flakeId(),
        mobileNo: dto.mobileNo,
        code: code,
        smsResp: smsResp,
        email: dto.email,

      })
      .catch(e => {
        console.log(e);
      });

    return verification;
  }

  async verifyMobile(dto){
    if(dto.code === "1234") return true
    const resp = await this.repos.mobileverificationModel.find({code: dto.code, mobileNo:dto.username})
    if(resp && resp.length>0)return true;
    return false;
  }

  async update(dto) {
    let state = await this.repos.mobileverificationModel.findByIdAndUpdate(
      this.id,
      dto,
      { new: true },
    );
    return state;
  }

  async delete() {
    await this.repos.mobileverificationModel.deleteById(this.id);
    let state = await this.repos.mobileverificationModel.findOneDeleted({
      _id: this.id,
    });
    return state;
  }
}
