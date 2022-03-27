import {Map} from 'components/Map/Map';
import React, {useEffect, useState} from 'react';
import {LatLng, Map as LeafletMap} from 'leaflet';
import {Nullable} from 'types/basic';
import {IMarker} from 'components/Map/Marker/Marker.interface';
import {Header} from 'components/Header/HeaderWithBackground/Header';
import style from 'pages/CreateRoutePage/CreateRoutePage.module.css';
import {MarkerForm} from 'components/Forms/MarkerForm/MarkerForm';
import {CreateRouteForm} from 'components/Forms/CreateRouteForm/CreateRouteForm';

export const CreateRoutePage = () => {
  const initCenter: LatLng = new LatLng(55.5807481, 36.8251304);

  const [map, setMap] = useState<Nullable<LeafletMap>>(null);
  const [currentLabels, setCurrentLabels] = useState<IMarker[]>([]);
  const [currentLinePoints, setCurrentLinePoints] = useState<LatLng[]>([]);

  const [selectedLabel, setSelectedLabel] = useState<Nullable<IMarker>>(null);

  useEffect(() => {
    if (selectedLabel && !currentLabels.includes(selectedLabel)) {
      setSelectedLabel(null);
    }
  }, [currentLabels.length]);

  const onChangeLabel = (newLabel: IMarker, needClose = false) => {
    setCurrentLabels(
      currentLabels.map((label) => {
        if (label.position.equals(newLabel.position)) {
          return newLabel;
        }
        return label;
      }),
    );

    if (needClose) {
      closeMarkerForm();
    }
  };

  const closeMarkerForm = () => {
    setSelectedLabel(null);
  };

  return (
    <>
      <Header title={'Создание маршрута'} />
      <div className={style.contentContainer}>
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
        <div className={style.createForm}>
          <CreateRouteForm title={'Введите название'} />
        </div>
      </div>
    </>
  );
};
