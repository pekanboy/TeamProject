import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer} from 'react-leaflet';
import {LatLng, LeafletMouseEvent, Map as LeafletMap} from 'leaflet';
import style from 'components/Map/Map.module.css';
import {MarkerComponent} from 'components/Map/Marker/Marker';
import {Line} from 'components/Map/Line/Line';
import {Nullable, Setter} from 'types/basic';
import {IMarker} from 'components/Map/Marker/Marker.interface';
import {toCenter} from 'components/Map/Map.helpers';
import {findMarker} from 'components/Map/Marker/Marker.helpers';
import {Inspector} from 'components/Map/Inspector/Inspector';
import classNames from 'classnames';
import {useEffectEveryOnce} from 'hooks/useEffectEveryOnce';
import {IRoute} from 'interfaces/IRoute';
import {DEFAULT_POSITION} from 'configs/base.const';
import {useNavigate} from 'react-router-dom';
import {selectedMarkerIcon} from 'components/Map/Marker/Marker.const';

export interface MapProps {
  center: LatLng;
  editable: boolean;
  map: Nullable<LeafletMap>;
  setMap: Setter<Nullable<LeafletMap>>;
  currentLabels: IMarker[];
  setCurrentLabels?: Setter<IMarker[]>;
  currentLinePoints: LatLng[];
  setCurrentLinePoints?: Setter<LatLng[]>;
  selectLabel?: Nullable<IMarker>;
  setSelectedLabel?: Setter<Nullable<IMarker>>;
  className?: string;
  initZoom?: number;
  allRoutes?: IRoute[];
}

export const Map: React.FC<MapProps> = ({
  center,
  map,
  setMap,
  selectLabel,
  currentLabels,
  setCurrentLabels,
  currentLinePoints,
  setCurrentLinePoints,
  setSelectedLabel,
  editable,
  className,
  initZoom,
  allRoutes,
}) => {
  const [isActiveLabel, setIsActiveLabel] = useState<boolean>(false);
  const [isActiveLine, setIsActiveLine] = useState<boolean>(false);

  // Первым элементом является последняя отмененная точка
  const [deletedLabels, setDeletedLabels] = useState<IMarker[]>([]);
  const [deletedLinePoints, setDeletedLinePoints] = useState<LatLng[]>([]);

  const navigate = useNavigate();

  // при добавлении точек к линии перемещает центр к последней точке
  useEffect(() => {
    map &&
      currentLinePoints.length &&
      toCenter(map, currentLinePoints[currentLinePoints.length - 1]);
  }, [currentLinePoints.length]);

  useEffectEveryOnce(() => {
    map?.on('zoomend', () => {
      center = map?.getCenter();
    });

    return () => {
      map?.off('zoomend');
    };
  }, [map !== null]);

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

        setSelectedLabel?.(point);
        setDeletedLabels([]);
      } else if (isActiveLine) {
        setCurrentLinePoints?.((prev) => [...prev, latlng]);
        setDeletedLinePoints([]);
      }
    });

    return () => {
      map.off('click');
    };
  }, [isActiveLine, isActiveLabel]);

  // Если кнопку отжимают то форма пропадает
  useEffect(() => {
    setSelectedLabel?.(null);
  }, [!isActiveLabel]);

  const onMarkerClick = (event: LeafletMouseEvent) => {
    const clickedLabel = findMarker(currentLabels, event.latlng);
    clickedLabel.length === 1 && setSelectedLabel?.(clickedLabel[0]);
  };

  // Карта полностью создаться только после создания компонента, поэтому
  // нужен колбек, который засетит мапку
  const whenMapCreated = (map: LeafletMap) => {
    setMap(map);
  };

  if (!editable) {
    return (
      <div className={classNames(style.container, className)}>
        <MapContainer
          className={style.mapContainer}
          center={center}
          zoomControl={false}
          zoom={7}
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
          {allRoutes?.map((route) => (
            <MarkerComponent
              needPopup={false}
              needAnimation={true}
              title={route.title}
              position={route.start || DEFAULT_POSITION}
              key={route.start?.toString()}
              onClick={() => {
                navigate(`/route/${route.id}`);
              }}
            />
          ))}
          <Line points={currentLinePoints} />
        </MapContainer>
      </div>
    );
  }

  return (
    <div className={classNames(style.container, className)}>
      <MapContainer
        className={style.mapContainer}
        center={center}
        zoomControl={false}
        zoom={initZoom || 7}
        minZoom={3}
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
        {selectLabel && (
          <MarkerComponent
            onClick={onMarkerClick}
            needPopup={true}
            needAnimation={true}
            title={selectLabel.title}
            position={selectLabel.position}
            icon={selectedMarkerIcon}
          />
        )}
        <Line points={currentLinePoints} />
      </MapContainer>
      <Inspector
        map={map}
        currentLabels={currentLabels}
        currentLinePoints={currentLinePoints}
        deletedLinePoints={deletedLinePoints}
        deletedLabels={deletedLabels}
        // Todo удалить !
        setCurrentLabels={setCurrentLabels!}
        setCurrentLinePoints={setCurrentLinePoints!}
        setDeletedLabels={setDeletedLabels}
        setDeletedLinePoints={setDeletedLinePoints}
        isActiveLabel={isActiveLabel}
        isActiveLine={isActiveLine}
        setIsActiveLabel={setIsActiveLabel}
        setIsActiveLine={setIsActiveLine}
        className={classNames(style.inspector, style.overMapObject)}
      />
    </div>
  );
};
