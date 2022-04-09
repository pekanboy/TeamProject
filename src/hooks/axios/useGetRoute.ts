import {GetRoutePath, URLToSendRequests} from 'configs/base.const';
import {mapRouteFromApi} from 'hooks/axios/helpers/mapRoute.helpers';
import {Nullable, Setter} from 'types/basic';
import {IRoute} from 'interfaces/IRoute';
import {customAxios} from 'hooks/axios/customAxios';

export const useGetRoute = async (
  id: number,
  route: Nullable<IRoute>,
  setRoute: Setter<Nullable<IRoute>>,
) => {
  const {data, message, code} = await customAxios({
    url: `${URLToSendRequests}${GetRoutePath(id)}`,
    method: 'GET',
  });

  if (!data || code < 200 || code >= 300) {
    console.error(message);
    return;
  }

  // const {data: links, code: codeLink} = await customAxios({
  //   url: `${URLToSendRequests}/files/route/${id}`,
  //   method: 'GET',
  // });

  if (data && code >= 200 && code < 300) {
    setRoute({
      ...mapRouteFromApi(data),
      photos: [],
    });
    return;
  }

  console.error(`Get route request filed. Code: ${message}. Message: ${code}`);
};
