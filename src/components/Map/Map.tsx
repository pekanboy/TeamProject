import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import {LatLng, LeafletMouseEvent, Map as LeafletMap} from 'leaflet';
import style from 'components/Map/Map.module.css';
import 'leaflet/dist/leaflet.css';
import {MapButton} from 'components/Buttons/MapButton';
import {MarkerComponent} from 'components/Map/Marker/Marker';
import {Line} from 'components/Map/Line/Line';
import {Nullable, Setter} from 'types/basic';
import {IMarker} from 'components/Map/Marker/Marker.interface';

interface MapProps {
  initCenter: LatLng;
  map: Nullable<LeafletMap>;
  setMap: Setter<Nullable<LeafletMap>>;
  currentLabels: IMarker[];
  setCurrentLabels: Setter<IMarker[]>;
  currentLinePoints: LatLng[];
  setCurrentLinePoints: Setter<LatLng[]>;
}

export const Map: React.FC<MapProps> = ({
  initCenter,
  map,
  setMap,
  currentLabels,
  setCurrentLabels,
  currentLinePoints,
  setCurrentLinePoints,
}) => {
  const [center] = useState<LatLng>(initCenter);
  const [isActiveLabel, setIsActiveLabel] = useState<boolean>(false);
  const [isActiveLine, setIsActiveLine] = useState<boolean>(false);

  // эффект, который отвечает за переключение режимов "Метка", "Линия"
  useEffect(() => {
    if (!map) {
      return;
    }

    map.on('click', ({latlng}: LeafletMouseEvent) => {
      if (isActiveLabel) {
        const point: IMarker = {
          position: latlng,
        };

        setCurrentLabels((prev) => [...prev, point]);
      } else if (isActiveLine) {
        setCurrentLinePoints((prev) => [...prev, latlng]);
      }
    });

    return () => {
      map.off('click');
    };
  }, [isActiveLine, isActiveLabel]);

  const handleClickLabelButton = () => {
    setIsActiveLabel((prev) => !prev);
    setIsActiveLine(false);
  };

  const handleClickLineButton = () => {
    setIsActiveLine((prev) => !prev);
    setIsActiveLabel(false);
  };

  // Карта полностью создаться только после создания компонента, поэтому
  // нужен колбек, который засетит мапку
  const whenMapCreated = (map: LeafletMap) => {
    setMap(map);
  };

  return (
    <div className={style.container}>
      <MapContainer
        className={style.mapContainer}
        center={center}
        zoom={5}
        whenCreated={whenMapCreated}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {currentLabels.map(({title, position}) => (
          <MarkerComponent
            title={title}
            position={position}
            key={position.toString()}
          />
        ))}
        <Line points={currentLinePoints} />
      </MapContainer>
      <MapButton
        className={style.label}
        isActive={isActiveLabel}
        onClick={handleClickLabelButton}
      >
        Метка
      </MapButton>
      <MapButton
        className={style.line}
        isActive={isActiveLine}
        onClick={handleClickLineButton}
      >
        Линия
      </MapButton>
    </div>
  );
};
