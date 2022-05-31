export function GqlBuildCondition(condition = {}) {
  let s = JSON.stringify(condition);
  s = s.replace(/___/g, '$');
  s = s.replace(/__/g, '.');
  let c = JSON.parse(s);
  return c;
}
