import React from 'react';
import style from 'components/Header/Header/Header.module.css';
import {Text, TextMode} from 'components/Text/Text';
import classNames from 'classnames';

export interface HeaderWithBackgroundProps {
  title: string;
  className?: string;
}

export const Header: React.FC<HeaderWithBackgroundProps> = ({
  title,
  className,
}) => {
  return (
    <div className={classNames(style.container, className)}>
      <Text mode={TextMode.TITLE1}>{title}</Text>
    </div>
  );
};
