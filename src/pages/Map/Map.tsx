import React, {useEffect, useRef, useState} from 'react';
import {Nullable} from 'types/basic';
import {LatLng, Map as LeafletMap} from 'leaflet';
import style from 'pages/Map/Map.module.css';
import {Header} from 'components/Header/Header/Header';
import {Map} from 'components/Map/Map';
import {DEFAULT_POSITION} from 'configs/base.const';
import {useEffectEveryOnce} from 'hooks/useEffectEveryOnce';
import {useBoundsAllRoutes} from 'hooks/axios/useBoundsAllRoutes';
import {IRoute} from 'interfaces/IRoute';

export const MapPage = () => {
  const [map, setMap] = useState<Nullable<LeafletMap>>(null);
  const [routes, setRoutes] = useState<IRoute[]>([]);
  const center = useRef<LatLng>(DEFAULT_POSITION);
  const onScroll = useBoundsAllRoutes(
    (routes: IRoute[]) => {
      setRoutes(routes);
    },
    (error, code) => {
      console.error(
        `Get altitude request filed. Code: ${code}. Message: ${error}`,
      );
    },
  );

  useEffectEveryOnce(() => {
    map?.on('zoomend', () => {
      onScroll(map?.getBounds());
    });
    map?.on('moveend', () => {
      onScroll(map?.getBounds());
    });

    return () => {
      map?.off('zoomend');
      map?.off('moveend');
    };
  }, [map !== null]);

  return (
    <div className={style.container}>
      <Header title={'Все маршруты (на карте)'} className={style.header} />
      <div className={style.content}>
        <Map
          editable={false}
          center={center.current}
          map={map}
          initZoom={13}
          setMap={setMap}
          currentLabels={[]}
          currentLinePoints={[]}
          allRoutes={routes}
        />
      </div>
    </div>
  );
};
