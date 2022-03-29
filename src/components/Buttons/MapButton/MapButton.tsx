import React from 'react';
import classNames from 'classnames';
import {IconButton} from '@vkontakte/vkui';
import style from 'components/Buttons/MapButton/MapButton.module.css';

export interface MapButtonProps {
  className?: string;
  iconClass?: string;
  isActive?: boolean;
  onClick: () => void;
  icon?: string;
}

export const MapButton: React.FC<MapButtonProps> = ({
  className,
  isActive,
  iconClass,
  children,
  onClick,
  icon,
}) => {
  return (
    <IconButton
      icon={
        icon && <img className={classNames(iconClass, style.icon)} src={icon} />
      }
      onClick={onClick}
      className={classNames(style.button, className, {
        [style.active]: isActive,
      })}
    >
      {children}
    </IconButton>
  );
};
