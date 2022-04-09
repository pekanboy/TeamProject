import {IMarker} from 'components/Map/Marker/Marker.interface';
import {LatLng} from 'leaflet';

export interface IRoute {
  bestTimeToGo?: string;
  climb?: number;
  // Todo user
  days: number;
  description: string;
  difficult: number;
  needModerate: boolean;
  title: string;
  region: string;
  things: string[];
  distance: number;

  photos: File[] | string[];

  markers: IMarker[];
  routePoints: LatLng[];

  type: string;

  id?: number;
  start?: LatLng;
}

export const defaultRoute: IRoute = {
  bestTimeToGo: 'Лето',
  climb: 123,
  days: 3,
  description:
    'Повседневная практика показывает, что постоянное информационно-пропагандистское обеспечение нашей деятельности играет важную роль в формировании позиций, занимаемых участниками в отношении поставленных задач. Повседневная практика показывает, что консультация с широким активом играет важную роль в формировании направлений прогрессивного развития... Повседневная практика показывает, что консультация с широким активом играет важную роль в формировании направлений прогрессивного развития... ',
  difficult: 4,
  needModerate: false,
  title: 'Тропы оленей',
  region: 'Москва',
  things: [],
  distance: 0,

  photos: [],

  markers: [],
  routePoints: [],

  type: 'Пеший',
};
