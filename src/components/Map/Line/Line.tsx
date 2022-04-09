import React from 'react';
import {Polyline} from 'react-leaflet';
import {MarkerComponent} from 'components/Map/Marker/Marker';
import {dotIcon, linePointIcon} from 'components/Map/Marker/Marker.const';
import {LatLng} from 'leaflet';

export interface LineProps {
  points: LatLng[];
}

export const Line: React.FC<LineProps> = ({points}) => {
  return (
    <>
      {points.map((point, index) => {
        let icon = dotIcon;
        if (index === 0 || index === points.length - 1) {
          icon = linePointIcon;
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
