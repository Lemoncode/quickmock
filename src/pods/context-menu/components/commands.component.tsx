import classes from './commands.component.module.css';
import { CopyCommand } from './copy-command/copy-command.component';
import { DeleteCommand } from './delete-command/delete-command.component';
import { PasteCommand } from './paste-command/paste-command.component';

interface CommandsProps {
  setShowContextMenu: (show: boolean) => void;
}

export const Commands: React.FC<CommandsProps> = props => {
  const { setShowContextMenu } = props;
  return (
    <div>
      <div className={classes.title}>
        <p>Commands</p>
      </div>
      <CopyCommand setShowContextMenu={setShowContextMenu} />
      <PasteCommand setShowContextMenu={setShowContextMenu} />
      <DeleteCommand setShowContextMenu={setShowContextMenu} />
    </div>
  );
};
