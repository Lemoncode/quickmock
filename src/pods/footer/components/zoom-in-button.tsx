import { ZoomInIcon } from '@/common/components/icons/zoom-in.component';

interface ZoomInButtonProps {
  scale: number;
  setScale: React.Dispatch<React.SetStateAction<number>>;
  className: string;
}

export const ZoomInButton: React.FC<ZoomInButtonProps> = props => {
  const { scale, setScale, className } = props;

  const handleClick = () => {
    setScale(prevScale => Number(Math.min(1.5, prevScale + 0.1).toFixed(1)));
  };

  const isDisabled = scale >= 1.5;

  return (
    <button onClick={handleClick} className={className} disabled={isDisabled}>
      <ZoomInIcon />
    </button>
  );
};
