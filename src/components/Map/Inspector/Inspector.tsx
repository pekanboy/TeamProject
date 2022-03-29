import {MapButton} from 'components/Buttons/MapButton/MapButton';
import style from 'components/Map/Inspector/Inspector.module.css';
import React from 'react';
import {Setter} from 'types/basic';
import {IMarker} from 'components/Map/Marker/Marker.interface';
import {LatLng} from 'leaflet';
import flag from 'image/flag.svg';
import marker from 'image/marker.svg';
import classNames from 'classnames';

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
}) => {
  const handleClickLabelButton = () => {
    setIsActiveLabel((prev) => !prev);
    setIsActiveLine(false);
  };

  const handleClickLineButton = () => {
    setIsActiveLine((prev) => !prev);
    setIsActiveLabel(false);
  };

  const onBackPressed = () => {
    if (isActiveLabel && currentLabels.length) {
      const [lastLabel, ...otherLabels] = currentLabels.reverse();
      setCurrentLabels(otherLabels.reverse());
      setDeletedLabels((prevDeletedLabels) => [
        lastLabel,
        ...prevDeletedLabels,
      ]);

      return;
    }

    if (isActiveLine && currentLinePoints.length) {
      const [lastLinePoint, ...otherLinePoints] = currentLinePoints.reverse();
      setCurrentLinePoints(otherLinePoints.reverse());
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
      <MapButton className={style.button} onClick={onBackPressed}>
        Назад
      </MapButton>
      <MapButton className={style.button} onClick={onNextPressed}>
        Вперед
      </MapButton>
    </div>
  );
};
