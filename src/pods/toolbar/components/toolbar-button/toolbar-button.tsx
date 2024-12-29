//import { isMacOS } from '@/common/helpers/platform.helpers';
import { useShortcut } from '../../shortcut/shortcut.hook';
import { ShortcutOptions } from '../../shortcut/shortcut.model';
import { Tooltip } from '@/common/components/tooltip';

interface Props {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  shortcutOptions?: ShortcutOptions;
  icon?: React.ReactNode;
  label: string;
}
export const ToolbarButton: React.FC<Props> = props => {
  const {
    onClick = () => {},
    className,
    disabled,
    icon,
    label,
    shortcutOptions,
  } = props;

  //const shortcutCommand = isMacOS() ? 'Cmd' : 'Ctrl';
  const showTooltip = shortcutOptions && !disabled;
  //const tooltipText = `(${shortcutCommand} + ${shortcutOptions?.targetKeyLabel})`;
  const tooltipText = `(${shortcutOptions?.targetKeyLabel})`;
  useShortcut({
    ...shortcutOptions,
    targetKey: shortcutOptions?.targetKey || [],
    callback: onClick,
  });

  return (
    <>
      {showTooltip ? (
        <Tooltip label={tooltipText} leftPosition="50%" bottomPosition="-60%">
          <button
            onClick={onClick}
            className={className}
            disabled={disabled}
            aria-describedby={shortcutOptions?.id}
          >
            <span aria-hidden={true}>{icon}</span>
            <span>{label}</span>
          </button>
        </Tooltip>
      ) : (
        <button
          onClick={onClick}
          className={className}
          disabled={disabled}
          aria-describedby={shortcutOptions?.id}
        >
          <span aria-hidden={true}>{icon}</span>
          <span>{label}</span>
        </button>
      )}
    </>
  );
};
