import * as flakeIdgen from 'flake-idgen';
import * as biguintFormat from 'biguint-format';

export function flakeId(): string {
  return biguintFormat(new flakeIdgen().next(), 'dec').toString();
}
