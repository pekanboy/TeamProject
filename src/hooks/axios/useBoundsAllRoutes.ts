import {LatLngBounds} from 'leaflet';
import {customAxios} from 'hooks/axios/customAxios';
import {AllRoutePath, URLToSendRequests} from 'configs/base.const';
import {IRoute} from 'interfaces/IRoute';
import {IBackRoute} from 'hooks/axios/useCreateRoute';
import {mapRouteFromApi} from 'hooks/axios/helpers/mapRoute.helpers';

export const useBoundsAllRoutes = (
  onSuccess?: (data: any[]) => void,
  onError?: (x: string, y: number) => void,
) => {
  return async (area: LatLngBounds) => {
    const ne = area.getNorthEast();
    const sw = area.getSouthWest();

    const params = new URLSearchParams({
      ne: `${ne.lat} ${ne.lng}`,
      sw: `${sw.lat} ${sw.lng}`,
    }).toString();

    const {data, message, code} = await customAxios({
      url: `${URLToSendRequests}${AllRoutePath}?${params}`,
      method: 'GET',
    });

    if (code < 200 || code >= 300) {
      onError?.(message, Number(code));
      return null;
    }

    const routes: IRoute[] = data?.map((apiRoute: IBackRoute) =>
      apiRoute ? mapRouteFromApi(apiRoute) : null,
    );

    onSuccess?.(routes);
  };
};
