import { CopyIcon } from '@/common/components/icons';
import classes from './copy-command.component.module.css';
import { useCanvasContext } from '@/core/providers';

interface CopyCommandProps {
  setShowContextMenu: (show: boolean) => void;
}

export const CopyCommand: React.FC<CopyCommandProps> = props => {
  const { setShowContextMenu } = props;
  const { canCopy, copyShapeToClipboard } = useCanvasContext();

  const handleCopyClick = () => {
    if (canCopy) {
      copyShapeToClipboard();
      setShowContextMenu(false);
    }
  };

  return (
    <div onClick={handleCopyClick} className={classes.container}>
      <p>
        Copy <span className={classes.shortcut}>(Ctrl+C)</span>
      </p>
      <CopyIcon />
    </div>
  );
};
