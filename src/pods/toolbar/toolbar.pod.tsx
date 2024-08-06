import { DeleteButton } from './components/delete-button';
import {
  ZoomInButton,
  ZoomOutButton,
  ExportButton,
  NewButton,
  OpenButton,
  SaveButton,
  UndoButton,
  RedoButton,
  AboutButton,
} from './components/index';
import classes from './toolbar.pod.module.css';

export const ToolbarPod: React.FC = () => {
  return (
    <div className={classes.container}>
      <NewButton />
      <OpenButton />
      <SaveButton />
      <ZoomOutButton />
      <ZoomInButton />
      <UndoButton />
      <RedoButton />
      <ExportButton />
      <DeleteButton />
      <AboutButton />
    </div>
  );
};
