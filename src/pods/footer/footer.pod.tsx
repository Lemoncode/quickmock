import { useCanvasContext } from '@/core/providers';
import classes from './footer.pod.module.css';
import { ZoomInButton, ZoomOutButton } from './components';

export const FooterPod = () => {
  const { scale, setScale, getActivePageName, fileName } = useCanvasContext();

  return (
    <footer className={classes.container}>
      <div className={classes.left}>
        <p>
          <strong>📄 {fileName == '' ? 'New' : fileName}</strong> -{' '}
          {getActivePageName()}
        </p>
      </div>
      <div className={classes.center}>
        <p>Quickmock - © Lemoncode</p>
      </div>
      <div className={classes.right}>
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
      </div>
    </footer>
  );
};
