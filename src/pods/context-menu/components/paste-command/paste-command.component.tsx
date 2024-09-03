import { PasteIcon } from '@/common/components/icons';
import classes from './paste-command.component.module.css';
import { useCanvasContext } from '@/core/providers';

interface PasteCommandProps {
  setShowContextMenu: (show: boolean) => void;
}

export const PasteCommand: React.FC<PasteCommandProps> = props => {
  const { setShowContextMenu } = props;
  const { canPaste, pasteShapeFromClipboard } = useCanvasContext();

  const handlePasteClick = () => {
    if (canPaste) {
      pasteShapeFromClipboard();
      setShowContextMenu(false);
    }
  };

  return (
    <div onClick={handlePasteClick} className={classes.container}>
      <p>
        Paste <span className={classes.shortcut}>(Ctrl+V)</span>
      </p>
      <PasteIcon />
    </div>
  );
};
