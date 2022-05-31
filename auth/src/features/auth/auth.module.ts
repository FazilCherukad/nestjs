import { Module, OnModuleInit } from '@nestjs/common';
import { CommandHandlers } from './commands';
import { CqrsModule } from '@nestjs/cqrs';
import { RepositoryCollection } from './repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { ALL_ENTITIES } from 'ibap-common/dist/services/entities';
import { QueryHandlers } from './queries';
import { RpcControllers } from './controllers';

@Module({
  imports: [CqrsModule, MongooseModule.forFeature([...ALL_ENTITIES])],
  controllers: [...RpcControllers],
  providers: [...CommandHandlers, ...QueryHandlers, RepositoryCollection],
})
export class AuthModule implements OnModuleInit {

  constructor(
    private readonly repos: RepositoryCollection
  ) { }

  async onModuleInit() {
    if (global['config'].AUTH_INIT == 'true') {

      // Create default client if default client not found
      let client = await this.repos.clientModel.findOne({ name: "default" });
      if(client == null) {
        client = await this.repos.clientModel.create({
          fId: "d",
          name: "d",
          secret: "s",
          type: "default"
        });
      }

      // Create guest authUser if guest user not found
      let guest = await this.repos.authUserModel.findOne({ username: "guest" });;
      if (guest == null) {
        guest = await this.repos.authUserModel.create({
          fId: "g",
          username: "g",
          password: "g",
          firstName: "g",
          lastName: "",
          email: "",
          mobile: ""
        })
      }

      // Create guest authUser if guest user not found
      let superAdmin = await this.repos.authUserModel.findOne({ username: "superadmin" });;
      if (superAdmin == null) {
        superAdmin = await this.repos.authUserModel.create({
          fId: "s",
          username: "s",
          password: "s",
          firstName: "s",
          lastName: "s",
          email: "",
          mobile: ""
        })
      }

      // Create accessToken for guest if not found
      let accessToken = await this.repos.accessTokenModel.findOne({ token : "guest"});
      if(accessToken == null) {
        accessToken = await this.repos.accessTokenModel.create({
          token: "s",
          expiry: null,
          authUser: guest.id,
          client: client.id
        });
      }
    }

  }
}
