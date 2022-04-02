import {IRoute} from 'interfaces/IRoute';
import {CreateRoutePath, URLToSendRequests} from 'configs/base.const';
import {customAxios} from 'hooks/axios/customAxios';
import {mapRouteToApi} from 'hooks/axios/helpers/mapRoute.helpers';

export interface IBackRoute {
  best_time_to_go: string;
  climb: number;
  creator_id: number;
  days: number;
  description: string;
  distance: number;
  difficult: number;
  mod_status: string;
  marks: {
    title: string;
    description: string;
    photo?: string[];
    point: {
      height: string;
      latitude: string;
      longitude: string;
    };
  }[];
  name: string;
  region: string;
  route: {
    height: string;
    latitude: string;
    longitude: string;
  }[];
  start: {
    height: string;
    latitude: string;
    longitude: string;
  };
  type: string;
  id?: number;
}

export const useCreateRoute = (
  onSuccess: (data: any) => void,
  onError: (x: string, y: number) => void,
) => {
  return async (route: IRoute) => {
    const {data, message, code} = await customAxios({
      url: `${URLToSendRequests}${CreateRoutePath}`,
      data: mapRouteToApi(route),
      method: 'POST',
    });

    if (code < 200 || code >= 300) {
      onError(message, code);
      return;
    }

    onSuccess(data);
  };
};
