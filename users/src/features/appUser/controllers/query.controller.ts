import { QueryBus } from '@nestjs/cqrs';
import { Controller } from '@nestjs/common';
import { MessagePattern, RpcException } from '@nestjs/microservices';
import { RPCServices } from 'ibap-common/dist/services/rpc-services';
import { Users } from 'ibap-common/dist/services/users/services';
import { GetOneAppUserQuery } from '../queries/appUser/get-one-appUser.query';
import { GetManyAppUserQuery } from '../queries/appUser/get-many-appUsers.query';
import { GetAppUserCountQuery } from '../queries/appUser/get-appUser-count.query';
import { GetAppUserRolesQuery } from '../queries/appUser/get-appUser-roles.query';
import { GetManyMobileverificationsQuery } from '../queries/mobileVerification/get-many-mobileverifications.query';
import { GetOneMobileverificationQuery } from '../queries/mobileVerification/get-one-mobileverification.query';
import { GetMobileVerificationsCountQuery } from '../queries/mobileVerification/get-mobileverification-count.query';


@Controller()
export class QueryController {
  constructor(private readonly queryBus: QueryBus) {}



//   // ---------------------------------- User ----------------------------------------------/

  @MessagePattern({ service: RPCServices.Users, cmd: Users.GetOneAppUserQuery })
  async getOneUser(query: any) {
    return await this.queryBus.execute(new GetOneAppUserQuery(query)).catch(e => {
      throw new RpcException(e.message);
    });
  }

  @MessagePattern({ service: RPCServices.Users, cmd: Users.GetManyAppUserQuery })
  async getManyUsers(query: any) {
    return await this.queryBus
      .execute(new GetManyAppUserQuery(query))
      .catch(e => {
        throw new RpcException(e.message);
      });
  }

  @MessagePattern({ service: RPCServices.Users, cmd: Users.GetAppUserCountQuery })
  async getAppUserCount(query: any) {
    return await this.queryBus
      .execute(new GetAppUserCountQuery(query))
      .catch(e => {
        throw new RpcException(e.message);
      });
  }

  

 
 }
