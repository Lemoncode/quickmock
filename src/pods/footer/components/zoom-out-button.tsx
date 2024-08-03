import { ZoomOutIcon } from '@/common/components/icons/zoom-out.component';

interface ZoomOutButtonProps {
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  className: string;
}

export const ZoomOutButton: React.FC<ZoomOutButtonProps> = props => {
  const { scale, setScale, className } = props;

  const handleClick = () => {
    setScale(prevScale => Number(Math.max(0.5, prevScale - 0.1).toFixed(1)));
  };

  const isDisabled = scale <= 0.5;

  return (
    <button onClick={handleClick} className={className} disabled={isDisabled}>
      <ZoomOutIcon />
    </button>
  );
};
