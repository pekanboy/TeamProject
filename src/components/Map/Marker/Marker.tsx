import React from 'react';
import {Marker, Popup} from 'react-leaflet';
import {Icon, LeafletMouseEventHandlerFn} from 'leaflet';
import icon from 'image/flag.svg';
import {IMarker} from 'components/Map/Marker/Marker.interface';

export interface MarkerProps extends IMarker {
  needPopup?: boolean;
  needAnimation?: boolean;
  onClick?: LeafletMouseEventHandlerFn;
}

const markerLabel = new Icon({
  iconUrl: icon,
  iconSize: [23, 27],
  iconAnchor: [0, 27],
});

export const MarkerComponent: React.FC<MarkerProps> = ({
  title,
  position,
  icon,
  needPopup,
  onClick,
}) => {
  return (
    <Marker
      icon={icon || markerLabel}
      position={position}
      eventHandlers={{click: onClick}}
    >
      {title && needPopup && <Popup offset={[8, -20]}>{title}</Popup>}
    </Marker>
  );
};
