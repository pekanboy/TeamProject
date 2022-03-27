import {Icon, LatLng} from 'leaflet';
import marker from 'image/marker.svg';
import dot from 'image/dot.svg';
import React from 'react';
import {Polyline} from 'react-leaflet';
import {MarkerComponent} from 'components/Map/Marker/Marker';

export interface LineProps {
  points: LatLng[];
}

const markerLabel = new Icon({
  iconUrl: marker,
  iconSize: [31, 46],
  iconAnchor: [15, 45],
});

const dotLabel = new Icon({
  iconUrl: dot,
  iconSize: [9, 9],
  iconAnchor: [4.5, 4.5],
});

export const Line: React.FC<LineProps> = ({points}) => {
  return (
    <>
      {points.map((point, index) => {
        let icon = dotLabel;
        if (index === 0 || index === points.length - 1) {
          icon = markerLabel;
        }
        return (
          <MarkerComponent
            needPopup={false}
            icon={icon}
            position={point}
            key={point.toString()}
          />
        );
      })}
      <Polyline positions={points} color={'black'} dashArray={[5, 10]} />
    </>
  );
};
