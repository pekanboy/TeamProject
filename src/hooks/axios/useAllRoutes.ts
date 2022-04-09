import useAxios from 'axios-hooks';
import {AllRoutePath, URLToSendRequests} from 'configs/base.const';
import {IRoute} from 'interfaces/IRoute';
import {mapRouteFromApi} from 'hooks/axios/helpers/mapRoute.helpers';
import {IBackRoute} from 'hooks/axios/useCreateRoute';
import {useRef} from 'react';
import {IFilter} from 'interfaces/IFilter';
import {formQueryFilters} from 'hooks/axios/helpers/formQueryFilters';

export const useAllRoutes = () => {
  const lastUrl = useRef<string>(`${URLToSendRequests}${AllRoutePath}`);

  const [{data, error, loading}, refresh] = useAxios({
    url: lastUrl.current,
    method: 'GET',
  });

  const route: IRoute[] = data?.map((apiRoute: IBackRoute) =>
    apiRoute ? mapRouteFromApi(apiRoute) : null,
  );

  const refreshAllRoutes = (filters?: IFilter) => {
    if (filters) {
      lastUrl.current = `${lastUrl.current.split('?')[0]}?${formQueryFilters(
        filters,
      )}`;
    }

    if (lastUrl.current[lastUrl.current.length - 1] === '?') {
      lastUrl.current = lastUrl.current.split('?')[0];
    }

    refresh({
      url: lastUrl.current,
      method: 'GET',
    });
  };
  return {
    route,
    loading,
    error,
    refresh: refreshAllRoutes,
  };
};
