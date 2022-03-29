import {IMarker} from 'components/Map/Marker/Marker.interface';
import {LatLng} from 'leaflet';

export interface IRoute {
  bestTimeToGo?: string;
  climb?: number;
  // Todo user
  travelTime: number;
  description: string;
  difficult: number;
  needModerate: boolean;
  title: string;
  region: string;

  markers: IMarker[];
  routePoints: LatLng[];

  type: string;
}

export const defaultRoute: IRoute = {
  bestTimeToGo: '',
  climb: 0,
  travelTime: 0,
  description: '',
  difficult: 0,
  needModerate: false,
  title: '',
  region: '',

  markers: [],
  routePoints: [],

  type: '',
};
