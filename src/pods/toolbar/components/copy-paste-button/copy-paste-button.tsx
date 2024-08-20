import { CopyIcon, PasteIcon } from '@/common/components/icons';
import { ToolbarButton } from '../toolbar-button';
import classes from '@/pods/toolbar/toolbar.pod.module.css';
import { useCanvasContext } from '@/core/providers';
import { SHORTCUTS } from '../../shortcut/shortcut.const';
import { useClipboard } from '@/pods/canvas/use-clipboard.hook';
import { useState, useEffect } from 'react';

export const CopyButton = () => {
  const { selectionInfo } = useCanvasContext();
  const { copyShapeToClipboard, pasteShapeFromClipboard, isClipboardFilled } =
    useClipboard();
  const [clipboardFilled, setClipboardFilled] = useState(false);

  const handleCopyClick = () => {
    if (selectionInfo.selectedShapeId) {
      copyShapeToClipboard();
      setClipboardFilled(true);
    }
  };

  const handlePasteClick = () => {
    pasteShapeFromClipboard();
  };

  useEffect(() => {
    setClipboardFilled(isClipboardFilled());
  }, [isClipboardFilled]);

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
            disabled={!clipboardFilled} // Disable the button if the clipboard is not filled
            shortcutOptions={SHORTCUTS.paste}
          />
        </li>
      </ul>
    </div>
  );
};
