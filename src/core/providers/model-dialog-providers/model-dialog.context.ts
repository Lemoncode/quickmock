import React from 'react';

import { ModalDialogContextModel } from './model-dialog.model';

export const ModalDialogContext =
  React.createContext<ModalDialogContextModel | null>(null);
