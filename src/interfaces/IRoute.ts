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

  markers: IMarker[];
  routePoints: LatLng[];

  type: string;
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

  markers: [],
  routePoints: [],

  type: 'Пеший',
};
