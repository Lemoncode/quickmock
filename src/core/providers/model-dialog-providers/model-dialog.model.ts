/* import React from 'react'; */

export interface ModalDialogModel {
  isOpen: boolean;
  /* selectedComponent: React.ReactNode | null; */
  title: string;
}

export const createInitialModalDialog = (): ModalDialogModel => ({
  isOpen: false,
  /* selectedComponent: null, */
  title: 'Default Title',
});

export interface ModalDialogContextModel {
  openModal: (/* component: React.ReactNode | null, */ title: string) => void;
  closeModal: () => void;
  modalDialog: ModalDialogModel;
}
