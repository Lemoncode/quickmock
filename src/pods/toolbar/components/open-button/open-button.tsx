import { OpenIcon } from '@/common/components/icons/open-icon.component';
import ToolbarButton from '../toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const OpenButton = () => {
  const handleClick = () => {
    console.log('Hola desde Open');
  };

  return (
    <ToolbarButton onClick={handleClick} className={classes.button}>
      <OpenIcon />
      <span>Open</span>
    </ToolbarButton>
  );
};

export default OpenButton;
