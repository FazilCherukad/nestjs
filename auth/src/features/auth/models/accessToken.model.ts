import { AggregateRoot } from '@nestjs/cqrs';
import { flakeId } from 'ibap-common/dist/common/snippets/flake-idgen';
import { RepositoryCollection } from '../repositories';

export class AccessToken extends AggregateRoot {
  id: string;
  repos: RepositoryCollection;

  constructor(repos, id?) {
    super();
    this.id = id;
    this.repos = repos;
  }

  async create(dto: any) {
    const state = await this.repos.accessTokenModel.create(dto);
    return state;
  }

  async update(dto) {
    let state = await this.repos.accessTokenModel.findByIdAndUpdate(
      this.id,
      dto,
      { new: true },
    );
    return state;
  }

  async delete() {
    await this.repos.accessTokenModel.deleteById(this.id)
    let state = await this.repos.accessTokenModel.findOneDeleted({
      _id: this.id,
    });
    return state;
  }
}
