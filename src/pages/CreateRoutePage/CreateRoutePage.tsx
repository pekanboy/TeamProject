import {Map} from 'components/Map/Map';
import React, {useState} from 'react';
import {LatLng, Map as LeafletMap} from 'leaflet';
import {Nullable} from 'types/basic';
import {IMarker} from 'components/Map/Marker/Marker.interface';

export const CreateRoutePage = () => {
  const initCenter: LatLng = new LatLng(55.5807481, 36.8251304);

  const [map, setMap] = useState<Nullable<LeafletMap>>(null);
  const [currentLabels, setCurrentLabels] = useState<IMarker[]>([]);
  const [currentLinePoints, setCurrentLinePoints] = useState<LatLng[]>([]);

  return (
    <Map
      initCenter={initCenter}
      map={map}
      setMap={setMap}
      currentLabels={currentLabels}
      setCurrentLabels={setCurrentLabels}
      currentLinePoints={currentLinePoints}
      setCurrentLinePoints={setCurrentLinePoints}
    />
  );
};
