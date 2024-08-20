import { CopyIcon, PasteIcon } from '@/common/components/icons';
import { ToolbarButton } from '../toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { useCanvasContext } from '@/core/providers';
import { SHORTCUTS } from '../../shortcut/shortcut.const';
import { useClipboard } from '@/pods/canvas/use-clipboard.hook';

export const CopyButton = () => {
  const { selectionInfo } = useCanvasContext();
  const { copyShapeToClipboard, pasteShapeFromClipboard } = useClipboard();

  const handleCopyClick = () => {
    if (selectionInfo.selectedShapeId) {
      copyShapeToClipboard();
    }
  };

  const handlePasteClick = () => {
    pasteShapeFromClipboard();
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
            disabled={!selectionInfo.selectedShapeId}
            shortcutOptions={SHORTCUTS.copy}
          />
        </li>
        <li>
          <ToolbarButton
            icon={<PasteIcon />}
            label="Paste"
            onClick={handlePasteClick}
            className={classes.button}
            shortcutOptions={SHORTCUTS.paste}
          />
        </li>
      </ul>
    </div>
  );
};
