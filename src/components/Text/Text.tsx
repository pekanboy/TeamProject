import classNames from 'classnames';

import style from 'components/Text/Text.module.css';
import React from 'react';

export enum TextMode {
  LOGO,
  LITE,
  TITLE_1,
}

export interface TextProps {
  mode: TextMode;
  className?: string;
}

export const Text: React.FC<TextProps> = ({mode, children, className}) => {
  const textStyle = classNames(className, {
    [style.logo]: mode === TextMode.LOGO,
    [style.lite]: mode === TextMode.LITE,
    [style.title1]: mode === TextMode.TITLE_1,
  });

  return <div className={textStyle}>{children}</div>;
};
