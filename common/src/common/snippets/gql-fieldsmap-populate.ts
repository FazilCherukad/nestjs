export function GqlFieldsmapPopulate(query, fm) {
  let projections = [];
  let populations = [];

  for (let k in fm) {
    if (!fm[k]) projections.push(k);
    else {
      populate(fm, k, populations);
    }
  }

  query = query.select(projections);
  for (let i = 0; i < populations.length; i++) {
    query = query.populate(populations[i]);
  }

  return query;
}

function populate(fm, k, popus) {
  let s = [];
  let p = [];
  for (let l in fm[k]) {
    if (!fm[k][l]) s.push(l);
    else populate(fm[k], l, p);
  }
  return popus.push({ path: k, select: s, populate: p, options: { withDeleted: true } });
}
