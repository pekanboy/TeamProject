import React from 'react';
import {Marker, Popup} from 'react-leaflet';
import {LeafletMouseEventHandlerFn} from 'leaflet';
import {IMarker} from 'components/Map/Marker/Marker.interface';
import {markerIcon} from 'components/Map/Marker/Marker.const';

export interface MarkerProps extends IMarker {
  needPopup?: boolean;
  needAnimation?: boolean;
  onClick?: LeafletMouseEventHandlerFn;
}

export const MarkerComponent: React.FC<MarkerProps> = ({
  title,
  position,
  icon,
  needPopup,
  onClick,
  children,
}) => {
  return (
    <Marker
      icon={icon || markerIcon}
      position={position}
      eventHandlers={onClick ? {click: onClick} : undefined}
    >
      {title && needPopup && <Popup offset={[8, -20]}>{title}</Popup>}
      {children}
    </Marker>
  );
};
