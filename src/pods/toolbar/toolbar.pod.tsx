import { DeleteButton } from './components/delete-button';
import { CopyButton } from './components/copy-paste-button';
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
import { SettingsButton } from './components/settings-button';
import { useInteractionModeContext } from '@/core/providers';

export const ToolbarPod: React.FC = () => {
  const { interactionMode } = useInteractionModeContext();
  const isEditMode = interactionMode === 'edit';
  return (
    <header className={classes.container}>
      <ul className={classes.buttonGroup}>
        {isEditMode && (
          <li>
            <NewButton />
          </li>
        )}
        <li>
          <OpenButton />
        </li>
        {isEditMode && (
          <>
            <li>
              <SaveButton />
            </li>

            <li>
              <ExportButton />
            </li>
          </>
        )}
      </ul>
      {isEditMode && (
        <ul className={classes.buttonGroup}>
          <li>
            <UndoButton />
          </li>
          <li>
            <RedoButton />
          </li>
          <li>
            <CopyButton />
          </li>
          <li>
            <DeleteButton />
          </li>
        </ul>
      )}
      <ul className={classes.buttonGroup}>
        <li>
          <ZoomOutButton />
        </li>
        <li>
          <ZoomInButton />
        </li>
      </ul>
      <ul className={classes.buttonGroup}>
        {isEditMode && (
          <li>
            <SettingsButton />
          </li>
        )}
        <li>
          <AboutButton />
        </li>
      </ul>
    </header>
  );
};
