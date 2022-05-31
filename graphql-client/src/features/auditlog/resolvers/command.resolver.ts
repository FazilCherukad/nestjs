import { Resolver, Mutation, Args } from "@nestjs/graphql";
import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module'
import { RPCServices } from "ibap-common/dist/services/rpc-services";
import { Auditlog } from "ibap-common/dist/services/auditlog/services";
import { Int } from "type-graphql";
import { GraphQLJSONObject } from 'graphql-type-json';
import { DeleteDto } from "../../../common/dtos/delete.dto";
import { GraphQLError } from 'graphql';
import { IbapUserLogType } from "../types/ibapUserLog.type";
import { CreateIbapUserLogDto } from "../dtos/create-ibapUserLog.dto";
import { UpdateIbapUserLogDto } from "../dtos/update-ibapUserLog.dto";


@Resolver()
export class CommandResolver {

  constructor(
    private readonly nats: NatsClientService
  ) { }

  // Message_Patterns
  
// -------------------------  IbapUserLog ------------------------------------------ //

  @Mutation(returns => IbapUserLogType)
    async createIbapUserLog(@Args('data') data: CreateIbapUserLogDto) {
      return await this.nats.sendSync(RPCServices.Auditlog, Auditlog.CreateIbapUserLogCommand, data).catch((e) => { throw new GraphQLError(e.messagee) });
  }

  @Mutation(returns => IbapUserLogType)
    async updateIbapUserLog(@Args('data') data: UpdateIbapUserLogDto) {
      return await this.nats.sendSync(RPCServices.Auditlog, Auditlog.UpdateIbapUserLogCommand, data).catch((e) => { throw new GraphQLError(e.message) });
  }

  @Mutation(returns => IbapUserLogType)
    async deleteIbapUserLog(@Args('data') data: DeleteDto) {
      return await this.nats.sendSync(RPCServices.Auditlog, Auditlog.DeleteIbapUserLogCommand, data).catch((e) => { throw new GraphQLError(e.message) });
  }

  
}
