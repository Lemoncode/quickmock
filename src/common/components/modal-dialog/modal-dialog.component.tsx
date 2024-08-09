import classes from './modal-dialog.component.module.css';
import React from 'react';

interface Props {
  title: string;
  isOpen: boolean;
}

export const ModalDialogComponent: React.FC<Props> = (props: Props) => {
  const { title } = props;
  const [isOpen, setIsOpen] = React.useState(true);

  React.useEffect(() => {
    console.log(isOpen);
  }, [isOpen]);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  console.log('Prueba');

  return (
    isOpen && (
      <div className={classes.dialogModal}>
        <div className={classes.mainDiv}>
          <div className={classes.xCloseModalDiv}>
            <h2>About us</h2>
            <button
              className={classes.xCloseModal}
              onClick={handleClick}
            ></button>
          </div>
          <div>
            <h1>{title ?? 'Dialog Modal Title'}</h1>
            <h2>Prueba</h2>
          </div>
          <div></div>
        </div>
      </div>
    )
  );
};
