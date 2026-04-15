import React from 'react';
import { InteractionModeContextModel } from './interaction-mode.model';

export const InteractionModeContext =
  React.createContext<InteractionModeContextModel | null>(null);
