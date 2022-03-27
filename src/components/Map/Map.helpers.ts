import {LatLng, Map} from 'leaflet';

export const toCenter = (map: Map, position: LatLng) => {
  map.panTo(position, {
    animate: true,
    duration: 1,
  });
};
