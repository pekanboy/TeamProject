import {Icon} from 'leaflet';
import flag from 'image/flag.svg';
import selectedFlag from 'image/selectedMarker.svg';
import linePoint from 'image/marker.svg';
import dot from 'image/dot.svg';

export const markerIcon = new Icon({
  iconUrl: flag,
  iconSize: [23, 27],
  iconAnchor: [0, 27],
});

export const selectedMarkerIcon = new Icon({
  iconUrl: selectedFlag,
  iconSize: [39, 27],
  iconAnchor: [16, 27],
});

export const linePointIcon = new Icon({
  iconUrl: linePoint,
  iconSize: [31, 46],
  iconAnchor: [15, 45],
});

export const dotIcon = new Icon({
  iconUrl: dot,
  iconSize: [9, 9],
  iconAnchor: [4.5, 4.5],
});
