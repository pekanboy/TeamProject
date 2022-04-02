import {GetRoutePath, URLToSendRequests} from 'configs/base.const';
import {mapRouteFromApi} from 'hooks/axios/helpers/mapRoute.helpers';
import {Setter} from 'types/basic';
import {IRoute} from 'interfaces/IRoute';
import {customAxios} from 'hooks/axios/customAxios';

export const useGetRoute = async (
  id: number,
  route: IRoute,
  setRoute: Setter<IRoute>,
) => {
  if (route.id) {
    return route;
  }

  const {data, message, code} = await customAxios({
    url: `${URLToSendRequests}${GetRoutePath(id)}`,
    method: 'GET',
  });

  if (data && code >= 200 && code < 300) {
    setRoute(mapRouteFromApi(data));
    return;
  }

  console.error(`Get route request filed. Code: ${message}. Message: ${code}`);
};
