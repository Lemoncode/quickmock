import { useInteractionModeContext } from '@/core/providers';
import classes from './main.layout.module.css';

interface Props {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: Props) => {
  const { interactionMode } = useInteractionModeContext();
  const isViewMode = interactionMode === 'view';
  return (
    <div
      className={
        isViewMode
          ? `${classes.layout} ${classes.viewModeLayout}`
          : classes.layout
      }
    >
      {children}
    </div>
  );
};
