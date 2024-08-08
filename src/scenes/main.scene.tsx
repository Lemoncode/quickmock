import { MainLayout } from '@/layout/main.layout';
import classes from './main.module.css';

import {
  CanvasPod,
  ToolbarPod,
  ContainerGalleryPod,
  ComponentGalleryPod,
  BasicShapesGalleryPod,
} from '@/pods';
import { PropertiesPod } from '@/pods/properties';
import { FooterPod } from '@/pods/footer/footer.pod';

export const MainScene = () => {
  return (
    <MainLayout>
      <ToolbarPod />
      <div className={classes.leftTools}>
        <details className={classes.container} name="toolsLeft">
          <summary className={classes.title}>Devices</summary>
          <ContainerGalleryPod />
        </details>
        <details className={classes.container} name="toolsLeft" open>
          <summary className={classes.title}>Components</summary>
          <ComponentGalleryPod />
        </details>
        <details className={classes.container} name="toolsLeft">
          <summary className={classes.title}>Basic Shapes</summary>
          <BasicShapesGalleryPod />
        </details>
      </div>
      <CanvasPod />
      <div className={classes.rightTools}>
        <PropertiesPod />
      </div>
      <div className={classes.footer}>
        <FooterPod />
      </div>
    </MainLayout>
  );
};
