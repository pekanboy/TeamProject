import classNames from 'classnames';

import style from 'components/Text/Text.module.css';
import React from 'react';

export enum TextMode {
  LOGO,
  TEXT,
  TITLE1,
  TITLE2,
  HEADLINE1,
  HEADLINE2,
}

export interface TextProps {
  mode: TextMode;
  className?: string;
}

export const Text: React.FC<TextProps> = ({mode, children, className}) => {
  const textStyle = classNames(
    {
      [style.logo]: mode === TextMode.LOGO,
      [style.text]: mode === TextMode.TEXT,
      [style.title1]: mode === TextMode.TITLE1,
      [style.title2]: mode === TextMode.TITLE2,
      [style.headline1]: mode === TextMode.HEADLINE1,
      [style.headline2]: mode === TextMode.HEADLINE2,
    },
    className,
  );

  return <div className={textStyle}>{children}</div>;
};
