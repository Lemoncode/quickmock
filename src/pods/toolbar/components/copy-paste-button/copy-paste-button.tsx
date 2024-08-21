import { CopyIcon, PasteIcon } from '@/common/components/icons';
import { ToolbarButton } from '../toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { useCanvasContext } from '@/core/providers';
import { SHORTCUTS } from '../../shortcut/shortcut.const';

export const CopyButton = () => {
  const { canCopy, canPaste, copyShapeToClipboard, pasteShapeFromClipboard } =
    useCanvasContext();

  const handleCopyClick = () => {
    if (canCopy) {
      copyShapeToClipboard();
    }
  };

  const handlePasteClick = () => {
    if (canPaste) {
      pasteShapeFromClipboard();
    }
  };

  return (
    <div>
      <ul className={classes.buttonGroup}>
        <li>
          <ToolbarButton
            icon={<CopyIcon />}
            label="Copy"
            onClick={handleCopyClick}
            className={classes.button}
            disabled={!canCopy}
            shortcutOptions={SHORTCUTS.copy}
          />
        </li>
        <li>
          <ToolbarButton
            icon={<PasteIcon />}
            label="Paste"
            onClick={handlePasteClick}
            className={classes.button}
            disabled={!canPaste} // Disable the button if the clipboard is not filled
            shortcutOptions={SHORTCUTS.paste}
          />
        </li>
      </ul>
    </div>
  );
};
