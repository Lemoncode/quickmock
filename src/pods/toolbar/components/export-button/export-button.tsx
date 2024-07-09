import { ExportIcon } from '@/common/components/icons/export-icon.component';
import ToolbarButton from '@/pods/toolbar/components/toolbar-button/toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';

export const ExportButton = () => {
  const handleClick = () => {
    console.log('Hola desde Export');
  };

  return (
    <ToolbarButton onClick={handleClick} className={classes.button}>
      <ExportIcon />
      <span>Export</span>
    </ToolbarButton>
  );
};

export default ExportButton;
