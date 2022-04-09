import {Icon, LatLng} from 'leaflet';

export interface IMarker {
  title?: string;
  description?: string;
  position: LatLng;
  icon?: Icon;
  photos?: string[];
}
