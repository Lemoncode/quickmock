import { useCanvasContext } from '@/core/providers';
import classes from './footer.pod.module.css';
import { ZoomInButton, ZoomOutButton } from './components';

export const FooterPod = () => {
  const { scale, setScale } = useCanvasContext();

  return (
    <footer className={classes.container}>
      <p className={classes.title}>Quickmock - © Lemoncode</p>
      <div className={classes.zoomContainer}>
        <ZoomOutButton
          scale={scale}
          setScale={setScale}
          className={classes.button}
        />
        <p className={classes.zoomValue}>{(scale * 100).toFixed(0)} %</p>
        <ZoomInButton
          scale={scale}
          setScale={setScale}
          className={classes.button}
        />
      </div>
    </footer>
  );
};
