import { isVSCodeEnv } from '#common/utils/env.utils.ts';
import { useInteractionModeContext } from '#core/providers';
import { CopyButton } from './components/copy-paste-button';
import { DeleteButton } from './components/delete-button';
import {
  AboutButton,
  ExportButton,
  NewButton,
  OpenButton,
  RedoButton,
  SaveButton,
  UndoButton,
  ZoomInButton,
  ZoomOutButton,
} from './components/index';
import { SettingsButton } from './components/settings-button';
import classes from './toolbar.pod.module.css';

export const ToolbarPod: React.FC = () => {
  const { interactionMode } = useInteractionModeContext();
  const isEditMode = interactionMode === 'edit';
  const isVSCode = isVSCodeEnv();
  return (
    <header className={classes.container}>
      {(isEditMode || !isVSCode) && (
        <ul className={classes.buttonGroup}>
          {isEditMode && (
            <li>
              <NewButton />
            </li>
          )}

          {!isVSCode && (
            <li>
              <OpenButton />
            </li>
          )}

          {isEditMode && !isVSCode && (
            <li>
              <SaveButton />
            </li>
          )}

          {isEditMode && (
            <li>
              <ExportButton />
            </li>
          )}
        </ul>
      )}
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
