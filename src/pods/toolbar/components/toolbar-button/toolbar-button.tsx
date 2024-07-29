interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
export const ToolbarButton: React.FC<Props> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default ToolbarButton;
