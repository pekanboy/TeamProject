import {Map} from 'components/Map/Map';
import React, {useEffect, useState} from 'react';
import {LatLng, Map as LeafletMap} from 'leaflet';
import {Nullable} from 'types/basic';
import {Header} from 'components/Header/Header/Header';
import style from 'pages/CreateRoutePage/CreateRoutePage.module.css';
import {CreateRouteForm} from 'components/Forms/CreateRouteForm/CreateRouteForm';
import {useRouteProvider} from 'providers/RouteProvider';
import {useSelectedLabel} from 'hooks/useSelectedLabel';
import {IRoute} from 'interfaces/IRoute';
import {useCreateRoute} from 'hooks/axios/useCreateRoute';
import {useAltitude} from 'hooks/axios/useAltitude';
import {CreateSidebar} from 'components/Sidebars/CreateSidebar/CreateSidebar';
import {useLocation} from 'wouter';
import {GetRoutePath} from 'configs/base.const';

export const CreateRoutePage = () => {
  const [, setLocation] = useLocation();
  useEffect(() => {
    window.scrollTo({top: 0});
  }, []);

  const {
    currentLabels,
    setCurrentLabels,
    currentLinePoints,
    setRoute,
    setCurrentLinePoints,
  } = useRouteProvider();
  const createRoute = useCreateRoute(
    (route) => {
      setCurrentLabels([]);
      setCurrentLinePoints([]);
      setRoute(route);
      setLocation(GetRoutePath(route.id));
    },
    (error, code) => {
      console.error(
        `Create Route request filed. Code: ${code}. Message: ${error}`,
      );
    },
  );
  const getAltitude = useAltitude(undefined, (error, code) => {
    console.error(
      `Get altitude request filed. Code: ${code}. Message: ${error}`,
    );
  });

  const initCenter: LatLng = new LatLng(55.5807481, 36.8251304);

  const [map, setMap] = useState<Nullable<LeafletMap>>(null);
  const {selectedLabel, onChangeLabel, setSelectedLabel, closeMarkerForm} =
    useSelectedLabel({currentLabels, setCurrentLabels});

  const onCreateRoute = async (newRoute: IRoute) => {
    // let data = null;
    //
    // try {
    //   data = await getAltitude(currentLinePoints);
    //   // eslint-disable-next-line no-empty
    // } catch (e) {}

    await createRoute({
      ...newRoute,
      markers: currentLabels,
      routePoints: currentLinePoints,
    });

    // const {link} = await useSendFile(newRoute.photos, newRoute);
    // setRoute((prev) => ({
    //   ...prev,
    //   photos: [...prev.photos, link],
    // }));
  };

  return (
    <div className={style.container}>
      <Header title={'Создание маршрута'} className={style.header} />
      <div className={style.content}>
        <div className={style.mapContainer}>
          <div className={style.map}>
            <Map
              selectLabel={selectedLabel}
              editable={true}
              center={initCenter}
              map={map}
              setMap={setMap}
              currentLabels={currentLabels}
              setCurrentLabels={setCurrentLabels}
              currentLinePoints={currentLinePoints}
              setCurrentLinePoints={setCurrentLinePoints}
              setSelectedLabel={setSelectedLabel}
            />
          </div>
          <CreateSidebar
            className={style.options}
            closeMarkerForm={closeMarkerForm}
            selectedLabel={selectedLabel}
            onChangeLabel={onChangeLabel}
          />
        </div>
        <CreateRouteForm
          className={style.createForm}
          onCreateRoute={onCreateRoute}
        />
      </div>
    </div>
  );
};
