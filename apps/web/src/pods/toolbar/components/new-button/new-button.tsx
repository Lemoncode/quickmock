import { NewIcon } from '#common/components/icons/new-button.components';
import { isVSCodeEnv } from '#common/utils/env.utils';
import { sendToExtension } from '#common/utils/vscode-bridge.utils';
import { useCanvasContext } from '#core/providers';
import classes from '#pods/toolbar/toolbar.pod.module.css';
import { APP_MESSAGE_TYPE } from '@lemoncode/quickmock-bridge-protocol';
import { SHORTCUTS } from '../../shortcut/shortcut.const';
import { ToolbarButton } from '../toolbar-button';

export const NewButton = () => {
  const { createNewFullDocument: clearCanvas } = useCanvasContext();

  const handleClick = () => {
    if (isVSCodeEnv()) {
      sendToExtension({ type: APP_MESSAGE_TYPE.NEW_FILE });
      return;
    }
    clearCanvas();
  };

  return (
    <ToolbarButton
      onClick={handleClick}
      className={classes.button}
      icon={<NewIcon />}
      label="New"
      shortcutOptions={SHORTCUTS.new}
    />
  );
};
