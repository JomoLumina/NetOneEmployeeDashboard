import React from 'react';
import type { FC } from 'react';

interface LogoWithoutIconProps {
  [key: string]: any;
}

const LogoWithoutIcon: FC<LogoWithoutIconProps> = (props) => {
  return (
    <img
      alt="Logo"
      src="/static/logo-without-icon.png"
      style={{width: '100%'}}
      {...props}
    />
  );
}


export default LogoWithoutIcon;
