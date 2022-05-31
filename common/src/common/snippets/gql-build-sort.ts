export function GqlBuildSort(sort = null) {
    if(sort && sort.includes('{')){
        var sort_string = sort.replace(/'/g, '"')
        return JSON.parse(sort_string);
    }
    return sort;
  }
  