export function stripQuery(query) {
  let condition = Object.assign({}, query);
  if (condition && condition.limit !== undefined) delete condition.limit;
  if (condition && condition.skip !== undefined) delete condition.skip;
  if (condition && condition.sort !== undefined) delete condition.sort;
  if (condition && condition.groupBy !== undefined) delete condition.groupBy;
  return condition;
}
