import classNames from 'classnames';

import style from 'components/Text/Text.module.css';
import React from 'react';

export enum TextMode {
  LOGO,
  TEXT_3,
  TEXT_2,
  TITLE_1,
  TITLE_2,
}

export interface TextProps {
  mode: TextMode;
  className?: string;
}

export const Text: React.FC<TextProps> = ({mode, children, className}) => {
  const textStyle = classNames(className, {
    [style.logo]: mode === TextMode.LOGO,
    [style.text2]: mode === TextMode.TEXT_2,
    [style.text3]: mode === TextMode.TEXT_3,
    [style.title1]: mode === TextMode.TITLE_1,
    [style.title2]: mode === TextMode.TITLE_2,
  });

  return <div className={textStyle}>{children}</div>;
};
