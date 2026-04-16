import React from 'react';
import { CanvasContextModel } from './canvas.model';

export const CanvasContext = React.createContext<CanvasContextModel | null>(
  null
);
