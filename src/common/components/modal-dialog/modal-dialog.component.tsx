import { useModalDialogContext } from '@/core/providers/model-dialog-providers/model-dialog.provider';
import classes from './modal-dialog.component.module.css';
import React, { useEffect } from 'react';
import { XIconComponent } from '../icons';

export const ModalDialogComponent: React.FC = () => {
  const { modalDialog, closeModal } = useModalDialogContext();
  const { isOpen, title, selectedComponent } = modalDialog;

  useEffect(() => {}, [modalDialog]);

  const handleClick = () => {
    closeModal();
  };

  return (
    isOpen && (
      <div className={classes.container}>
        <div className={classes.dialog}>
          <div className={classes.dialogHeader}>
            <h2 className={classes.dialogTitle}>{title}</h2>
            <button
              className={classes.dialogButton}
              onClick={handleClick}
              aria-label="close modal dialog"
            >
              <XIconComponent />
            </button>
          </div>
          <div>{selectedComponent}</div>
        </div>
      </div>
    )
  );
};
