import {Icon, LatLngExpression} from "leaflet";
import startIcon from '../../../image/start.png';
import endIcon from '../../../image/end.png';
import React from "react";
import {Polyline} from "react-leaflet";
import {MarkerComponent} from "../Marker/Marker";

export interface LineProps {
    points: LatLngExpression[];
}

const startMarkerLabel = new Icon({
    iconUrl: startIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 45]
});

const endMarkerLabel = new Icon({
    iconUrl: endIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 45]
});

export const Line: React.FC<LineProps> = ({points}) => {
  return (
      <>
          {points.length !== 0 && <MarkerComponent icon={startMarkerLabel} position={points[0]}/>}
          <Polyline positions={points}/>
          {points.length > 1 && <MarkerComponent icon={endMarkerLabel} position={points[points.length - 1]}/>}
      </>
  )
}