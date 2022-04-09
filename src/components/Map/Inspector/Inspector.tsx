import {MapButton} from 'components/Buttons/MapButton/MapButton';
import style from 'components/Map/Inspector/Inspector.module.css';
import React from 'react';
import {Nullable, Setter} from 'types/basic';
import {IMarker} from 'components/Map/Marker/Marker.interface';
import {LatLng, Map as LeafletMap} from 'leaflet';
import flag from 'image/flagGray.svg';
import marker from 'image/markerGray.svg';
import next from 'image/next.svg';
import back from 'image/back.svg';
import moveTo from 'image/moveTo.svg';
import classNames from 'classnames';
import {toCenter} from 'components/Map/Map.helpers';

export interface InspectorProps {
  isActiveLabel: boolean;
  setIsActiveLabel: Setter<boolean>;
  isActiveLine: boolean;
  setIsActiveLine: Setter<boolean>;
  currentLabels: IMarker[];
  setCurrentLabels: Setter<IMarker[]>;
  currentLinePoints: LatLng[];
  setCurrentLinePoints: Setter<LatLng[]>;
  deletedLabels: IMarker[];
  setDeletedLabels: Setter<IMarker[]>;
  deletedLinePoints: LatLng[];
  setDeletedLinePoints: Setter<LatLng[]>;
  className?: string;
  map: Nullable<LeafletMap>;
}

export const Inspector: React.FC<InspectorProps> = ({
  isActiveLabel,
  isActiveLine,
  setCurrentLabels,
  setCurrentLinePoints,
  setIsActiveLabel,
  setIsActiveLine,
  currentLabels,
  currentLinePoints,
  deletedLinePoints,
  deletedLabels,
  setDeletedLinePoints,
  setDeletedLabels,
  className,
  map,
}) => {
  const handleClickLabelButton = () => {
    setIsActiveLabel((prev) => !prev);
    setIsActiveLine(false);
  };

  const handleClickLineButton = () => {
    setIsActiveLine((prev) => !prev);
    setIsActiveLabel(false);
  };

  const handleMoveTo = () => {
    map?.setZoom(14);

    if (isActiveLabel) {
      map &&
        currentLabels.length &&
        toCenter(map, currentLabels[currentLabels.length - 1].position);
    }

    if (isActiveLine) {
      map &&
        currentLinePoints.length &&
        toCenter(map, currentLinePoints[currentLinePoints.length - 1]);
    }
  };

  const onBackPressed = () => {
    if (isActiveLabel && currentLabels.length) {
      const [lastLabel, ...otherLabels] = currentLabels.reverse();
      setCurrentLabels(otherLabels?.reverse() || []);
      setDeletedLabels((prevDeletedLabels) => [
        lastLabel,
        ...prevDeletedLabels,
      ]);

      return;
    }

    if (isActiveLine && currentLinePoints.length) {
      const [lastLinePoint, ...otherLinePoints] = currentLinePoints.reverse();
      setCurrentLinePoints(otherLinePoints?.reverse() || []);
      setDeletedLinePoints((prevDeletedLinePoints) => [
        lastLinePoint,
        ...prevDeletedLinePoints,
      ]);
    }
  };

  const onNextPressed = () => {
    if (isActiveLabel && deletedLabels.length) {
      const [lastDeletedLabel, ...otherDeletedLabels] = deletedLabels;
      setCurrentLabels((prevCurrentLabels) => [
        ...prevCurrentLabels,
        lastDeletedLabel,
      ]);
      setDeletedLabels(otherDeletedLabels);

      return;
    }

    if (isActiveLine && deletedLinePoints.length) {
      const [lastDeletedLinePoint, ...otherDeletedLinePoints] =
        deletedLinePoints;
      setCurrentLinePoints((prevCurrentLinePoints) => [
        ...prevCurrentLinePoints,
        lastDeletedLinePoint,
      ]);
      setDeletedLinePoints(otherDeletedLinePoints);
    }
  };
  return (
    <div className={classNames(style.container, className)}>
      <MapButton
        icon={flag}
        className={style.button}
        isActive={isActiveLabel}
        onClick={handleClickLabelButton}
      />
      <MapButton
        icon={marker}
        className={style.button}
        isActive={isActiveLine}
        onClick={handleClickLineButton}
      />
      <MapButton
        icon={moveTo}
        className={style.button}
        onClick={handleMoveTo}
      />
      <MapButton icon={back} className={style.button} onClick={onBackPressed} />
      <MapButton icon={next} className={style.button} onClick={onNextPressed} />
    </div>
  );
};
