import {IRoute} from 'interfaces/IRoute';
import {createRoutePath, URLToSendRequests} from 'configs/base.const';
import {customAxios} from 'hooks/axios/customAxios';

export const useCreateRoute = (
  onSuccess: (data: any) => void,
  onError: (x: string, y: number) => void,
) => {
  return async (route: IRoute) => {
    const {data, error, code} = await customAxios({
      url: `${URLToSendRequests}${createRoutePath}`,
      data: mapRouteForApiView(route),
      method: 'POST',
    });

    if (error) {
      onError(error, code);
      return;
    }

    onSuccess(data);
  };
};

const mapRouteForApiView = (route: IRoute) => {
  return {
    best_time_to_go: route.bestTimeToGo,
    climb: route.climb,
    // Todo изменить когда будет добавлять пользователя
    creator_id: 123,
    days: route.days,
    description: route.description,
    difficult: route.difficult,
    // Todo Изменить когда появится модерация
    is_moderate: false,
    marks: route.markers.map((marker) => ({
      description: marker.description,
      photo: marker.photos,
      point: {
        height: marker.position.alt,
        latitude: marker.position.lat,
        longitude: marker.position.lng,
      },
      title: marker.title,
    })),
    name: route.title,
    region: route.region,
    route: route.routePoints.map((point) => ({
      height: point.alt,
      latitude: point.lat,
      longitude: point.lng,
    })),
    start: {
      height: route.routePoints[0].alt,
      latitude: route.routePoints[0].lat,
      longitude: route.routePoints[0].lng,
    },
    type: route.type,
  };
};
