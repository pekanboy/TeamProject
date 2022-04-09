import {LatLng} from 'leaflet';

export const URLToSendRequests = 'https://trailite.ru/api/v1';
export const AltitudeGetURL = 'http://87.239.110.165:5000';

export const CreateRoutePath = '/route';
export const AllRoutePath = '/route';
export const FilesRoutePath = '/files';
export const GetFilesRoutePathPut = (id: number) => `/files/${id.toString()}`;
export const GetRoutePath = (id: number) => `/route/${id.toString()}`;

export const DEFAULT_POSITION = new LatLng(32, 23);
