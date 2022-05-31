import { AggregateRoot } from '@nestjs/cqrs';
import { flakeId } from 'ibap-common/dist/common/snippets/flake-idgen';
import { RepositoryCollection } from '../repositories';
// import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export class AuthUser extends AggregateRoot {
  id: string;
  repos: RepositoryCollection;

  constructor(repos, id?) {
    super();
    this.id = id;
    this.repos = repos;
  }

  async create(dto: any) {
    console.log(dto);
    let data = Object.assign({}, dto, { password: dto.password /*bcrypt.hashSync(dto.password, 8)*/ });
    const state = await this.repos.authUserModel.create(data);
    this.id = state.id;
    return state;
  }

  async update(dto) {
    let data;
    if (dto.password) {
      data = Object.assign({}, dto, { password: dto.password /*bcrypt.hashSync(dto.password, 8)*/ });
    } else {
      data = Object.assign({}, dto)
    }
    let state = await this.repos.authUserModel.findByIdAndUpdate(this.id, data, {
      new: true,
    });
    return state;
  }

  async delete() {
    await this.repos.authUserModel.deleteById(this.id)
    let state = await this.repos.authUserModel.findOneDeleted({
      _id: this.id,
    });
    return state;
  }

  async updatePassword(dto) {
    let data = { password: dto.password /*bcrypt.hashSync(dto.password, 8)*/ };
    const state = await this.repos.authUserModel.findByIdAndUpdate(this.id, data, { new: true });
    return state;
  }

  async validateAuthUser(dto: any) {
    const access = await this.repos.accessTokenModel.findOne({ token: dto.token, isRevoked: false })
      .populate({ path: 'authUser', select: ['-createdAt', '-updatedAt'] })
      .populate({ path: 'client', select: ['-createdAt', '-updatedAt'] });
    if (!access) return false;
    if (!access.client || !access.authUser) return false;

    return access.authUser.toJSON();
  }

  async login(dto) {
    // check client
    const client = await this.repos.clientModel.findOne({ name: dto.clientName, secret: dto.clientSecret, isActive: true });
    if (!client) throw new Error('client_not_allowed');

    // check user
    let user = await this.repos.authUserModel.findOne({ username: dto.username, isActive: true })
      .select(['id', 'firstName', 'lastName', 'username', 'email', 'mobile', 'password', 'roles']);
    if (!user) throw new Error('user_not_found');

    // Todo: Add encryption
    // compare user password
    // if (await !bcrypt.compareSync(dto.password, user.password))
    //   throw new Error('password_not_match');
    if (dto.password != user.password) throw new Error('password_not_match');

    user = Object.assign({}, user.toJSON());
    delete user['password'];

    const payload = {
      userId: user.id,
      username: user.username,
      client: client.name
    }

    // create access token
    const t = await jwt.sign(payload, 'XECDER2364sjdf');
    const token = await this.repos.accessTokenModel.create({
      token: t,
      expiry: null,
      isRevoked: false,
      authUser: user.id,
      client: client.id
    });

    return { accessToken: t, expiry: token.expiry, authUser: user };
  }

  async attachRole(dto) {
    let resp = await this.repos.authUserModel.findByIdAndUpdate(this.id, dto, { new: true })
    console.log("............model", resp)
    return resp;
  }
}
