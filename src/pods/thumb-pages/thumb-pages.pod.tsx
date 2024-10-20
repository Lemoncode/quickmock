import React from 'react';
import classes from './thumb-pages.module.css';
import { useCanvasContext } from '@/core/providers';
import { ThumbPage } from './components';

export const ThumbPagesPod: React.FC = () => {
  const { fullDocument } = useCanvasContext();

  return (
    <div className={classes.container}>
      {fullDocument.pages.map((page, index) => (
        <React.Fragment key={page.id}>
          <ThumbPage pageIndex={index} />
          <div>{page.name}</div>
        </React.Fragment>
      ))}
    </div>
  );
};
