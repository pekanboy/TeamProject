import style from 'pages/RoutePage/RoutePage.module.css';
import {Header} from 'components/Header/Header/Header';
import {Map} from 'components/Map/Map';
import React, {useState} from 'react';
import {useSelectedLabel} from 'hooks/useSelectedLabel';
import {useGetRoute} from 'hooks/useGetRoute';
import {Nullable} from 'types/basic';
import {LatLng, Map as LeafletMap} from 'leaflet';
import {useParams} from 'react-router-dom';
import {RouteInfo} from 'components/Information/RouteInfo/RouteInfo';
import defaultAvatar from 'image/avatar.png';

const DEFAULT_POSITION = new LatLng(32, 23);

export const RoutePage: React.FC = () => {
  const {id} = useParams();
  const {route} = useGetRoute(Number(id));
  console.log(id);
  const [map, setMap] = useState<Nullable<LeafletMap>>(null);
  const {selectedLabel, setSelectedLabel} = useSelectedLabel({
    currentLabels: route.markers,
  });

  return (
    <div className={style.container}>
      <Header
        title={route.title || 'Карточка маршрута'}
        className={style.header}
      />
      <div className={style.content}>
        <div className={style.mapContainer}>
          <div className={style.map}>
            <Map
              editable={false}
              initCenter={route.routePoints[0] || DEFAULT_POSITION}
              map={map}
              setMap={setMap}
              currentLabels={route.markers}
              currentLinePoints={route.routePoints}
              setSelectedLabel={setSelectedLabel}
            />
          </div>
          <div className={style.options}>
            <RouteInfo
              route={route}
              profileAvatar={defaultAvatar}
              selectedLabel={selectedLabel || undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
