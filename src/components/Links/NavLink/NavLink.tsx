import React from 'react';
import {NavLink as Link} from 'react-router-dom';
import {TextMode, Text} from 'components/Text/Text';

export interface NavLinkProps {
  className?: string;
  path: string;
  textMode?: TextMode;
}

export const NavLink: React.FC<NavLinkProps> = ({
  className,
  path,
  textMode = TextMode.TEXT_3,
  children,
}) => {
  return (
    <Link to={path} className={className}>
      <Text mode={textMode}>{children}</Text>
    </Link>
  );
};
