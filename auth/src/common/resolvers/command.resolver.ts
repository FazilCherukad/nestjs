// import { Resolver, Mutation, Args } from '@nestjs/graphql';
// import { NatsClientService } from 'ibap-common/dist/common/rpc-clients/nats/nats-client.module';
// import { RPCServices } from 'ibap-common/dist/services/rpc-services';
// import { Auth } from 'ibap-common/dist/services/auth/services';
// import { Int } from 'type-graphql';
// import { GraphQLJSONObject } from 'graphql-type-json';
// import { DeleteDto } from '../../../common/dtos/delete.dto';
// import { GraphQLError } from 'graphql';

// import { AuthUserType } from '../types/authUser.type';
// import { CreateAuthUserDto } from '../dtos/create-authUser.dto';
// import { UpdateAuthUserDto } from '../dtos/update-authUser.dto';

// import { AccessTokenType } from '../types/accessToken.type';
// import { CreateAccessTokenDto } from '../dtos/create-accessToken.dto';
// import { UpdateAccessTokenDto } from '../dtos/update-accessToken.dto';

// import { ClientType } from '../types/client.type';
// import { CreateClientDto } from '../dtos/create-client.dto';
// import { UpdateClientDto } from '../dtos/update-client.dto';

// @Resolver()
// export class CommandResolver {
//   constructor(private readonly nats: NatsClientService) {}

//   // Message_Patterns

//   // -------------------------  Client ------------------------------------------ //

//   @Mutation(returns => ClientType)
//   async createClient(@Args('data') data: CreateClientDto) {
//     return await this.nats
//       .sendSync(RPCServices.Auth, Auth.CreateClientCommand, data)
//       .catch(e => {
//         throw new GraphQLError(e);
//       });
//   }

//   @Mutation(returns => ClientType)
//   async updateClient(@Args('data') data: UpdateClientDto) {
//     return await this.nats
//       .sendSync(RPCServices.Auth, Auth.UpdateClientCommand, data)
//       .catch(e => {
//         throw new GraphQLError(e);
//       });
//   }

//   @Mutation(returns => ClientType)
//   async deleteClient(@Args('data') data: DeleteDto) {
//     return await this.nats
//       .sendSync(RPCServices.Auth, Auth.DeleteClientCommand, data)
//       .catch(e => {
//         throw new GraphQLError(e);
//       });
//   }

//   // -------------------------  AccessToken ------------------------------------------ //

//   @Mutation(returns => AccessTokenType)
//   async createAccessToken(@Args('data') data: CreateAccessTokenDto) {
//     return await this.nats
//       .sendSync(RPCServices.Auth, Auth.CreateAccessTokenCommand, data)
//       .catch(e => {
//         throw new GraphQLError(e);
//       });
//   }

//   @Mutation(returns => AccessTokenType)
//   async updateAccessToken(@Args('data') data: UpdateAccessTokenDto) {
//     return await this.nats
//       .sendSync(RPCServices.Auth, Auth.UpdateAccessTokenCommand, data)
//       .catch(e => {
//         throw new GraphQLError(e);
//       });
//   }

//   @Mutation(returns => AccessTokenType)
//   async deleteAccessToken(@Args('data') data: DeleteDto) {
//     return await this.nats
//       .sendSync(RPCServices.Auth, Auth.DeleteAccessTokenCommand, data)
//       .catch(e => {
//         throw new GraphQLError(e);
//       });
//   }

//   // -------------------------  AuthUser ------------------------------------------ //

//   @Mutation(returns => AuthUserType)
//   async createAuthUser(@Args('data') data: CreateAuthUserDto) {
//     return await this.nats
//       .sendSync(RPCServices.Auth, Auth.CreateAuthUserCommand, data)
//       .catch(e => {
//         throw new GraphQLError(e);
//       });
//   }

//   @Mutation(returns => AuthUserType)
//   async updateAuthUser(@Args('data') data: UpdateAuthUserDto) {
//     return await this.nats
//       .sendSync(RPCServices.Auth, Auth.UpdateAuthUserCommand, data)
//       .catch(e => {
//         throw new GraphQLError(e);
//       });
//   }

//   @Mutation(returns => AuthUserType)
//   async deleteAuthUser(@Args('data') data: DeleteDto) {
//     return await this.nats
//       .sendSync(RPCServices.Auth, Auth.DeleteAuthUserCommand, data)
//       .catch(e => {
//         throw new GraphQLError(e);
//       });
//   }
// }
