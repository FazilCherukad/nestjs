import { AggregateRoot } from '@nestjs/cqrs';
import { flakeId } from 'ibap-common/dist/common/snippets/flake-idgen';
import { RepositoryCollection } from '../repositories';

export class Client extends AggregateRoot {
  id: string;
  repos: RepositoryCollection;

  constructor(repos, id?) {
    super();
    this.id = id;
    this.repos = repos;
  }

  async create(dto: any) {
    const state = await this.repos.clientModel.create(dto);
    return state;
  }

  async update(dto) {
    let state = await this.repos.clientModel.findByIdAndUpdate(this.id, dto, {
      new: true,
    });
    return state;
  }

  async delete() {
    await this.repos.clientModel.deleteById(this.id)
    let state = await this.repos.clientModel.findOneDeleted({ _id: this.id });
    return state;
  }
}
