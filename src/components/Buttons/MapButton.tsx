import React from 'react';
import classNames from 'classnames';
import {Button} from '@vkontakte/vkui';

export interface MapButtonProps {
  className?: string;
  isActive?: boolean;
  onClick: () => void;
}

export const MapButton: React.FC<MapButtonProps> = ({
  className,
  isActive,
  children,
  onClick,
}) => {
  return (
    <Button onClick={onClick} className={classNames(className)}>
      {children}
    </Button>
  );
};
