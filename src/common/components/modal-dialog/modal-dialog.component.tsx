import { useModalDialogContext } from '@/core/providers/model-dialog-providers/model-dialog.provider';
import classes from './modal-dialog.component.module.css';
import React, { useEffect } from 'react';

export const ModalDialogComponent: React.FC<Props> = () => {
  const { modalDialog, closeModal } = useModalDialogContext();
  const { isOpen, title } = modalDialog;

  useEffect(() => {}, [modalDialog]);

  const handleClick = () => {
    closeModal();
  };

  return (
    isOpen && (
      <div className={classes.dialogModal}>
        <div className={classes.mainDiv}>
          <div className={classes.xCloseModalDiv}>
            <h2>{title}</h2>
            <button
              className={classes.xCloseModal}
              onClick={handleClick}
            ></button>
          </div>
          <div className={classes.main}>
            <h1>{title ?? 'Dialog Modal Title'}</h1>
            <h2>{modalDialog.selectedComponent}</h2>
          </div>
        </div>
      </div>
    )
  );
};
