import classes from './zindex-option.module.css';

interface ButtonProps {
  onClick: () => void;
  Icon: React.ComponentType;
  label: string;
}

export const ZIndexButton: React.FC<ButtonProps> = props => {
  const { onClick, Icon, label } = props;
  return (
    <button
      onClick={onClick}
      className={classes.button}
      aria-label={label}
      title={label}
    >
      <Icon />
    </button>
  );
};
