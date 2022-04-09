import style from 'pages/RoutePage/RoutePage.module.css';
import {Header} from 'components/Header/Header/Header';
import {Map} from 'components/Map/Map';
import React, {useEffect, useState} from 'react';
import {useSelectedLabel} from 'hooks/useSelectedLabel';
import {useGetRoute} from 'hooks/axios/useGetRoute';
import {Nullable} from 'types/basic';
import {Map as LeafletMap} from 'leaflet';
import {RouteInfo} from 'components/Information/RouteInfo/RouteInfo';
import defaultAvatar from 'image/avatar.png';
import {defaultRoute} from 'interfaces/IRoute';
import {DEFAULT_POSITION} from 'configs/base.const';
import {useRouteProvider} from 'providers/RouteProvider';
import {Gallery} from 'components/Gallery/Gallery';

interface RoutePageProps {
  id: number;
}

export const RoutePage: React.FC<RoutePageProps> = ({id}) => {
  const {route, setRoute} = useRouteProvider();

  useGetRoute(Number(id), route, setRoute);
  const [map, setMap] = useState<Nullable<LeafletMap>>(null);
  const {selectedLabel, setSelectedLabel} = useSelectedLabel({
    currentLabels: route?.markers || [],
  });

  useEffect(() => {
    return () => {
      setRoute(null);
    };
  }, []);

  return (
    <div className={style.container}>
      <Header
        title={route?.title || 'Карточка маршрута'}
        className={style.header}
      />
      <div className={style.content}>
        <div className={style.mapContainer}>
          <div className={style.map}>
            <Map
              editable={false}
              center={route?.routePoints?.[0] || DEFAULT_POSITION}
              map={map}
              initZoom={13}
              setMap={setMap}
              currentLabels={route?.markers || []}
              currentLinePoints={route?.routePoints || []}
              setSelectedLabel={setSelectedLabel}
            />
          </div>
          <div className={style.options}>
            <RouteInfo
              route={route || defaultRoute}
              profileAvatar={defaultAvatar}
              selectedLabel={selectedLabel || undefined}
            />
          </div>
        </div>
        {route?.description && (
          <div className={style.description}>
            <div className={style.descriptionTitle}>Описание</div>
            <span className={style.descriptionText}>{route?.description}</span>
          </div>
        )}
        {(route?.photos?.length && (
          <div className={style.gallery}>
            <div className={style.galleryTitle}>Фотографии</div>
            <div>
              <Gallery
                result={route.photos}
                slideWith={250}
                needPicker={false}
              />
            </div>
          </div>
        )) ||
          null}
      </div>
    </div>
  );
};
