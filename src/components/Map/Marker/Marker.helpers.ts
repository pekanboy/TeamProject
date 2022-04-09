import {IMarker} from 'components/Map/Marker/Marker.interface';
import {LatLng} from 'leaflet';

export const findMarker = (markers: IMarker[], position: LatLng) => {
  return markers.filter((marker) => {
    if (marker.position.equals(position)) {
      return marker;
    }
  });
};
