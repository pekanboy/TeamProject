import {IRoute} from 'interfaces/IRoute';
import {IBackRoute} from 'hooks/axios/useCreateRoute';
import {LatLng} from 'leaflet';

export const mapRouteToApi = (route: IRoute): IBackRoute => {
  return {
    distance: Math.trunc(
      route.routePoints.reduce((prev, curr, index) => {
        if (index === 0) return prev;

        return prev + curr.distanceTo(route.routePoints[index - 1]);
      }, 0),
    ),
    best_time_to_go: route.bestTimeToGo || '',
    climb: route.climb || 0,
    // Todo изменить когда будет добавлять пользователя
    creator_id: 1,
    days: route.days,
    description: route.description,
    difficult: route.difficult,
    // Todo Изменить когда появится модерация
    mod_status: 'no status',
    marks: route.markers.map((marker) => ({
      description: marker.description || '',
      photo: marker.photos,
      point: {
        height: String(marker.position?.alt || 0),
        latitude: String(marker.position.lat),
        longitude: String(marker.position.lng),
      },
      title: marker.title || '',
    })),
    name: route.title,
    region: route.region,
    route: route.routePoints.map((point) => ({
      height: String(point?.alt || 0),
      latitude: String(point.lat),
      longitude: String(point.lng),
    })),
    start: {
      height: String(route.routePoints[0]?.alt || 0),
      latitude: String(route.routePoints[0].lat),
      longitude: String(route.routePoints[0].lng),
    },
    type: route.type,
  };
};

export const mapRouteFromApi = (backendRoute: IBackRoute): IRoute => {
  return {
    distance: backendRoute.distance,
    title: backendRoute?.name,
    days: backendRoute?.days,
    description: backendRoute?.description,
    difficult: backendRoute?.difficult,
    markers:
      backendRoute.marks?.map((mark) => ({
        title: mark?.title,
        position: new LatLng(
          Number(mark?.point?.latitude),
          Number(mark?.point?.longitude),
          Number(mark?.point?.height),
        ),
        photos: mark?.photo,
        description: mark?.description,
      })) || [],
    // Todo поправить на енам
    needModerate: !!backendRoute?.mod_status,
    region: backendRoute?.region,
    routePoints:
      backendRoute?.route?.map(
        (point) =>
          new LatLng(
            Number(point?.latitude),
            Number(point?.longitude),
            Number(point?.height),
          ),
      ) || [],
    // Todo тут вещи добавить
    things: [],
    type: backendRoute?.type,
    id: backendRoute?.id,
    start: new LatLng(
      Number(backendRoute.start?.latitude),
      Number(backendRoute.start?.longitude),
      Number(backendRoute.start?.height),
    ),
    photos: [],
  };
};
