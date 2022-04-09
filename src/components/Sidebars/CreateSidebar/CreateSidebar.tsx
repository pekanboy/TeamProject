import {MarkerForm} from 'components/Forms/MarkerForm/MarkerForm';
import {Button} from '@vkontakte/vkui';
import React from 'react';
import {IMarker} from 'components/Map/Marker/Marker.interface';
import style from 'components/Sidebars/CreateSidebar/CreateSidebar.module.css';
import classNames from 'classnames';
import {Nullable} from 'types/basic';
import {Text, TextMode} from 'components/Text/Text';

export interface CreateSidebarProps {
  selectedLabel: Nullable<IMarker>;
  onChangeLabel: (newLabel: IMarker, needClose?: boolean) => void;
  closeMarkerForm: () => void;
  className?: string;
}

export const CreateSidebar: React.FC<CreateSidebarProps> = ({
  selectedLabel,
  onChangeLabel,
  closeMarkerForm,
  className,
}) => {
  const onContinue = () => {
    window.scrollTo({
      left: 0,
      top: document.body.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className={classNames(style.container, className)}>
      <div className={style.background}>
        {selectedLabel && (
          <MarkerForm
            className={style.markerForm}
            setLabel={onChangeLabel}
            label={selectedLabel}
            close={closeMarkerForm}
          />
        )}
      </div>
      <Button
        className={style.continueButton}
        onClick={onContinue}
        mode={'primary'}
      >
        <Text mode={TextMode.HEADLINE2}>ДАЛЕЕ</Text>
      </Button>
    </div>
  );
};
