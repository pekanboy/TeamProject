import React from "react";
import {Marker, Popup} from "react-leaflet";
import {LatLngExpression, Icon} from "leaflet";
import icon from '../../../image/label.png'

export interface MarkerComponentProps {
    title?: string;
    position: LatLngExpression;
    icon?: Icon
}

const markerLabel = new Icon({
    iconUrl: icon,
    iconSize: [40, 40],
    iconAnchor: [20, 45]
});

export const MarkerComponent: React.FC<MarkerComponentProps> = ({title, position, icon}) => {
    return (
        <Marker icon={icon || markerLabel} position={position}>
            {title && <Popup>{title}</Popup>}
        </Marker>
    );
}