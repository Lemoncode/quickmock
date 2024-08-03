interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}
export const ToolbarButton: React.FC<Props> = ({
  children,
  onClick,
  className,
  disabled,
}) => {
  return (
    <button onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
};

export default ToolbarButton;
