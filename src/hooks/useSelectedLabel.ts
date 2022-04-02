import {useEffect, useState} from 'react';
import {Nullable, Setter} from 'types/basic';
import {IMarker} from 'components/Map/Marker/Marker.interface';
import {findMarker} from 'components/Map/Marker/Marker.helpers';

export interface useSelectedLabelProps {
  currentLabels: IMarker[];
  setCurrentLabels?: Setter<IMarker[]>;
}

export const useSelectedLabel = ({
  currentLabels,
  setCurrentLabels,
}: useSelectedLabelProps) => {
  const [selectedLabel, setSelectedLabel] = useState<Nullable<IMarker>>(null);

  useEffect(() => {
    if (selectedLabel && !currentLabels.includes(selectedLabel)) {
      setSelectedLabel(null);
    }
  }, [currentLabels.length]);

  const onChangeLabel = (newLabel: IMarker, needClose = false) => {
    if (!findMarker(currentLabels, newLabel.position).length) {
      setCurrentLabels?.((prev) => {
        return (selectedLabel && [...prev, selectedLabel]) || prev;
      });
    } else {
      setCurrentLabels?.(
        currentLabels.map((label) => {
          if (label.position.equals(newLabel.position)) {
            return newLabel;
          }
          return label;
        }),
      );
    }

    if (needClose) {
      closeMarkerForm();
    }
  };

  const closeMarkerForm = () => {
    setSelectedLabel(null);
  };

  return {
    onChangeLabel,
    selectedLabel,
    setSelectedLabel,
    closeMarkerForm,
  };
};
