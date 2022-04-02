import {IFilter} from 'interfaces/IFilter';
import * as querystring from 'query-string';

export const formQueryFilters = (filters: IFilter) => {
  return querystring.stringify(
    {
      type: filters.type,
      days: filters.days,
      difficult: filters.difficult,
      distance: filters.distance,
      sort: filters.sort,
      desc: filters.desc,
      limit: filters.limit,
      offset: filters.offset,
    },
    {skipEmptyString: true, arrayFormat: 'comma', skipNull: true},
  );
};
