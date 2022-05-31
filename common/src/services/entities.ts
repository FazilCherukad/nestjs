import { Entities as Users } from './users/entities';
import { Entities as Auth } from './auth/entities';

export const ALL_ENTITIES = [
  ...Auth,
  ...Users
];
