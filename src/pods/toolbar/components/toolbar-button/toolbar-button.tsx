import useShortcut from '../../shortcut/shortcut.hook';
/* import { isMacOS } from '@/common/helpers/platform.helpers'; */
import { ShortcutOptions } from '../../shortcut/shortcut.model';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  shortcutOptions?: ShortcutOptions;
  icon?: React.ReactNode;
  label: string;
}
export const ToolbarButton: React.FC<Props> = props => {
  const {
    children,
    onClick = () => {},
    className,
    disabled,
    icon,
    label,
    shortcutOptions,
  } = props;

  /* const shortcutCommand = isMacOS() ? 'Ctrl' : 'Alt';
  const showTooltip = shortcutOptions && !disabled;
  const tooltipText = `(${shortcutCommand} + ${shortcutOptions?.targetKeyLabel})`; */

  useShortcut({
    ...shortcutOptions,
    targetKey: shortcutOptions?.targetKey || [],
    callback: onClick,
  });

  return (
    <button
      onClick={onClick}
      className={className}
      disabled={disabled}
      aria-describedby={shortcutOptions?.id}
    >
      <span aria-hidden={true}>{icon}</span>
      <span>{label}</span>
      {/* {showTooltip && (
        <span role="tooltip" id={shortcutOptions?.id}>
          {tooltipText}
        </span>
      )} */}
      {children}
    </button>
  );
};

export default ToolbarButton;
