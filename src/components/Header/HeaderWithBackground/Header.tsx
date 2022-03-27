import React from 'react';
import style from 'components/Header/HeaderWithBackground/HeaderWithBackground.module.css';
import {Text, TextMode} from 'components/Text/Text';

export interface HeaderWithBackgroundProps {
  title: string;
}

export const Header: React.FC<HeaderWithBackgroundProps> = ({title}) => {
  return (
    <div className={style.container}>
      <Text mode={TextMode.TITLE_1}>{title}</Text>
    </div>
  );
};
