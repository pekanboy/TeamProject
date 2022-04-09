import React from 'react';
import {NavLink as Link} from 'react-router-dom';
import {TextMode, Text} from 'components/Text/Text';

export interface NavLinkProps {
  className?: string;
  path: string;
  textMode?: TextMode;
  after?: React.ReactNode;
}

export const NavLink: React.FC<NavLinkProps> = ({
  className,
  path,
  textMode = TextMode.HEADLINE1,
  children,
  after,
}) => {
  return (
    <Link to={path} className={className}>
      <Text mode={textMode}>{children}</Text>
      {after}
    </Link>
  );
};
