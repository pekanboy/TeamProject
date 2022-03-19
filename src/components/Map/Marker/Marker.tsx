import React from 'react';
import {Marker, Popup} from 'react-leaflet';
import {Icon} from 'leaflet';
import icon from 'image/label.png';
import {IMarker} from 'components/Map/Marker/Marker.interface';

const markerLabel = new Icon({
  iconUrl: icon,
  iconSize: [40, 40],
  iconAnchor: [20, 45],
});

export const MarkerComponent: React.FC<IMarker> = ({title, position, icon}) => {
  return (
    <Marker icon={icon || markerLabel} position={position}>
      {title && <Popup>{title}</Popup>}
    </Marker>
  );
};
