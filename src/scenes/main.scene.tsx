import { MainLayout } from '@/layout/main.layout';
import classes from './main.module.css';

import {
  CanvasPod,
  ToolbarPod,
  ContainerGalleryPod,
  ComponentGalleryPod,
} from '@/pods';
import { PropertiesPod } from '@/pods/properties';
import { FooterPod } from '@/pods/footer/footer.pod';

export const MainScene = () => {
  return (
    <MainLayout>
      <ToolbarPod />
      <div className={classes.componentsGallery}>
        <ContainerGalleryPod />
        <ComponentGalleryPod />
      </div>
      <CanvasPod />
      <div className={classes.propertiesOptions}>
        <PropertiesPod />
      </div>
      <div className={classes.footer}>
        <FooterPod />
      </div>
    </MainLayout>
  );
};
