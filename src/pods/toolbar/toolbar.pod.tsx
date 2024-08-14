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
    <header className={classes.container}>
      <ul className={classes.buttonGroup}>
        <li>
          <NewButton />
        </li>
        <li>
          <OpenButton />
        </li>
        <li>
          <SaveButton />
        </li>
        <li>
          <ExportButton />
        </li>
      </ul>
      <ul className={classes.buttonGroup}>
        <li>
          <UndoButton />
        </li>
        <li>
          <RedoButton />
        </li>
        <li>
          <DeleteButton />
        </li>
      </ul>
      <ul className={classes.buttonGroup}>
        <li>
          <ZoomOutButton />
        </li>
        <li>
          <ZoomInButton />
        </li>
      </ul>
      <ul className={classes.buttonGroup}>
        <li>
          <AboutButton />
        </li>
      </ul>
    </header>
  );
};
