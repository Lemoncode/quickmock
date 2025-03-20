import { ZIndexOptions } from '@/pods/properties/components';
import classes from './commands.component.module.css';
import { CopyCommand } from './copy-command/copy-command.component';
import { DeleteCommand } from './delete-command/delete-command.component';
import { PasteCommand } from './paste-command/paste-command.component';
import { useCanvasContext } from '@/core/providers';

interface CommandsProps {
  setShowContextMenu: (show: boolean) => void;
}

export const Commands: React.FC<CommandsProps> = props => {
  const { setShowContextMenu } = props;
  const { selectionInfo } = useCanvasContext();
  return (
    <div>
      <div className={classes.title}>
        <p>Options</p>
      </div>
      <ZIndexOptions selectionInfo={selectionInfo} />
      <CopyCommand setShowContextMenu={setShowContextMenu} />
      <PasteCommand setShowContextMenu={setShowContextMenu} />
      <DeleteCommand setShowContextMenu={setShowContextMenu} />
    </div>
  );
};
