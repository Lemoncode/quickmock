import React, { FC, MouseEventHandler } from 'react';
import classes from './favicon.component.module.css';

interface Props {
  icon: React.ReactNode;
  backgroundColor: string;
  onDoubleClick?: MouseEventHandler<HTMLImageElement>;
  size?: string;
}

export const FaviconComponent: FC<Props> = props => {
  const { icon, backgroundColor, onDoubleClick, size = '50px' } = props;
  return (
    <div
      className={classes.container}
      style={{ backgroundColor, width: size, height: size }}
      onDoubleClick={onDoubleClick}
    >
      {icon}
    </div>
  );
};

/* 


  USAGE EXAMPLE

  const handleDoubleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    console.log('Icon double-clicked!', event);
  };

  {
    <FaviconComponent
    icon="❤️"
    backgroundColor="lightblue"
    size="50px"
    onDoubleClick={handleDoubleClick}
    /> 
  }


*/
