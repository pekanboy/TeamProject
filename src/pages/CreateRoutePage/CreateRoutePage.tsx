import {Map} from 'components/Map/Map';
import React, {useState} from 'react';
import {LatLng, Map as LeafletMap} from 'leaflet';
import {Nullable} from 'types/basic';
import {Header} from 'components/Header/Header/Header';
import style from 'pages/CreateRoutePage/CreateRoutePage.module.css';
import {MarkerForm} from 'components/Forms/MarkerForm/MarkerForm';
import {CreateRouteForm} from 'components/Forms/CreateRouteForm/CreateRouteForm';
import {useRouteProvider} from 'providers/RouteProvider';
import {useSelectedLabel} from 'hooks/useSelectedLabel';
import {IRoute} from 'interfaces/IRoute';
import {useCreateRoute} from 'hooks/axios/useCreateRoute';

export const CreateRoutePage = () => {
  const {
    currentLabels,
    setCurrentLabels,
    setRoute,
    currentLinePoints,
    setCurrentLinePoints,
  } = useRouteProvider();
  const createRoute = useCreateRoute(
    (route) => {
      setCurrentLabels([]);
      setCurrentLinePoints([]);
      setRoute(route);
    },
    (error, code) => {
      console.error(
        `Create Route request filed. Code: ${code}. Message: ${error}`,
      );
    },
  );

  const initCenter: LatLng = new LatLng(55.5807481, 36.8251304);

  const [map, setMap] = useState<Nullable<LeafletMap>>(null);
  const {selectedLabel, onChangeLabel, setSelectedLabel, closeMarkerForm} =
    useSelectedLabel({currentLabels, setCurrentLabels});

  const onCreateRoute = (newRoute: IRoute) => {
    createRoute({
      ...newRoute,
      markers: currentLabels,
      routePoints: currentLinePoints,
    });
  };

  return (
    <div className={style.container}>
      <Header title={'Создание маршрута'} className={style.header} />
      <div className={style.content}>
        <div className={style.mapContainer}>
          <div className={style.map}>
            <Map
              editable={true}
              initCenter={initCenter}
              map={map}
              setMap={setMap}
              currentLabels={currentLabels}
              setCurrentLabels={setCurrentLabels}
              currentLinePoints={currentLinePoints}
              setCurrentLinePoints={setCurrentLinePoints}
              setSelectedLabel={setSelectedLabel}
            />
          </div>
          <div className={style.options}>
            {selectedLabel && (
              <MarkerForm
                setLabel={onChangeLabel}
                label={selectedLabel}
                close={closeMarkerForm}
              />
            )}
          </div>
        </div>
        <CreateRouteForm
          className={style.createForm}
          onCreateRoute={onCreateRoute}
        />
      </div>
    </div>
  );
};
