import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import {LatLng, LeafletMouseEvent, Map as LeafletMap} from 'leaflet';
import style from 'components/Map/Map.module.css';
import {MarkerComponent} from 'components/Map/Marker/Marker';
import {Line} from 'components/Map/Line/Line';
import {Nullable, Setter} from 'types/basic';
import {IMarker} from 'components/Map/Marker/Marker.interface';
import {toCenter} from 'components/Map/Map.helpers';
import {useEffectEveryOnce} from 'hooks/useEffectEveryOnce';
import {findMarker} from 'components/Map/Marker/Marker.helpers';
import {Inspector} from 'components/Map/Inspector/Inspector';
import classNames from 'classnames';

export interface MapProps {
  initCenter: LatLng;
  editable: boolean;
  map: Nullable<LeafletMap>;
  setMap: Setter<Nullable<LeafletMap>>;
  currentLabels: IMarker[];
  setCurrentLabels: Setter<IMarker[]>;
  currentLinePoints: LatLng[];
  setCurrentLinePoints: Setter<LatLng[]>;
  setSelectedLabel: Setter<Nullable<IMarker>>;
}

export const Map: React.FC<MapProps> = ({
  initCenter,
  map,
  setMap,
  currentLabels,
  setCurrentLabels,
  currentLinePoints,
  setCurrentLinePoints,
  setSelectedLabel,
  editable,
}) => {
  const [isActiveLabel, setIsActiveLabel] = useState<boolean>(false);
  const [isActiveLine, setIsActiveLine] = useState<boolean>(false);

  // Первым элементом является последняя отмененная точка
  const [deletedLabels, setDeletedLabels] = useState<IMarker[]>([]);
  const [deletedLinePoints, setDeletedLinePoints] = useState<LatLng[]>([]);

  // отвечает за зум к началу линии
  useEffectEveryOnce(() => {
    map?.setZoom(12);
  }, [currentLinePoints.length !== 0]);

  // при добавлении точек к линии перемещает центр к последней точке
  useEffect(() => {
    map && toCenter(map, currentLinePoints[currentLinePoints.length - 1]);
  }, [currentLinePoints.length]);

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
        setSelectedLabel(point);
        setDeletedLabels([]);
      } else if (isActiveLine) {
        setCurrentLinePoints((prev) => [...prev, latlng]);
        setDeletedLinePoints([]);
      }
    });

    return () => {
      map.off('click');
    };
  }, [isActiveLine, isActiveLabel]);

  // Если кнопку отжимают то форма пропадает
  useEffect(() => {
    setSelectedLabel(null);
  }, [!isActiveLabel]);

  const onMarkerClick = (event: LeafletMouseEvent) => {
    const clickedLabel = findMarker(currentLabels, event.latlng);
    clickedLabel.length === 1 && setSelectedLabel(clickedLabel[0]);
  };

  // Карта полностью создаться только после создания компонента, поэтому
  // нужен колбек, который засетит мапку
  const whenMapCreated = (map: LeafletMap) => {
    setMap(map);
  };

  if (!editable) {
    return (
      <div className={style.container}>
        <MapContainer
          className={style.mapContainer}
          center={initCenter}
          zoomControl={false}
          zoom={7}
          maxZoom={15}
          minZoom={4}
          whenCreated={whenMapCreated}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {currentLabels.map(({title, position}) => (
            <MarkerComponent
              needPopup={true}
              needAnimation={true}
              title={title}
              position={position}
              key={position.toString()}
            />
          ))}
          <Line points={currentLinePoints} />
        </MapContainer>
      </div>
    );
  }

  return (
    <div className={style.container}>
      <MapContainer
        className={style.mapContainer}
        center={initCenter}
        zoomControl={false}
        zoom={7}
        maxZoom={15}
        minZoom={4}
        whenCreated={whenMapCreated}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {currentLabels.map(({title, position}) => (
          <MarkerComponent
            onClick={onMarkerClick}
            needPopup={true}
            needAnimation={true}
            title={title}
            position={position}
            key={position.toString()}
          />
        ))}
        <Line points={currentLinePoints} />
      </MapContainer>
      <div className={classNames(style.inspector, style.overMapObject)}>
        <Inspector
          currentLabels={currentLabels}
          currentLinePoints={currentLinePoints}
          deletedLinePoints={deletedLinePoints}
          deletedLabels={deletedLabels}
          setCurrentLabels={setCurrentLabels}
          setCurrentLinePoints={setCurrentLinePoints}
          setDeletedLabels={setDeletedLabels}
          setDeletedLinePoints={setDeletedLinePoints}
          isActiveLabel={isActiveLabel}
          isActiveLine={isActiveLine}
          setIsActiveLabel={setIsActiveLabel}
          setIsActiveLine={setIsActiveLine}
        />
      </div>
    </div>
  );
};
