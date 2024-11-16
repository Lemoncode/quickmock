import { MainLayout } from '@/layout/main.layout';
import classes from './main.module.css';

import {
  CanvasPod,
  ToolbarPod,
  ContainerGalleryPod,
  ComponentGalleryPod,
  BasicShapesGalleryPod,
  RichComponentsGalleryPod,
  TextComponetGalleryPod,
} from '@/pods';
import { PropertiesPod } from '@/pods/properties';
import { FooterPod } from '@/pods/footer/footer.pod';
import { ThumbPagesPod } from '@/pods/thumb-pages';
import { useEffect, useRef, useState } from 'react';

export const MainScene = () => {
  const [isThumbPagesPodOpen, setIsThumbPagesPodOpen] = useState(false);
  const thumbPagesPodRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const handleToggle = () => {
      setIsThumbPagesPodOpen(thumbPagesPodRef.current?.open ?? false);
    };

    const detailsElement = thumbPagesPodRef.current;
    if (detailsElement) {
      detailsElement.addEventListener('toggle', handleToggle);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (detailsElement) {
        detailsElement.removeEventListener('toggle', handleToggle);
      }
    };
  }, []);

  return (
    <MainLayout>
      <ToolbarPod />
      <div className={classes.leftTools}>
        <details
          className={classes.container}
          name="toolsLeft"
          ref={thumbPagesPodRef}
        >
          <summary className={classes.title}>Pages</summary>
          <ThumbPagesPod isVisible={isThumbPagesPodOpen} />
        </details>
        <details className={classes.container} name="toolsLeft">
          <summary className={classes.title}>Devices</summary>
          <ContainerGalleryPod />
        </details>
        <details className={classes.container} name="toolsLeft" open>
          <summary className={classes.title}>Components</summary>
          <ComponentGalleryPod />
        </details>
        <details className={classes.container} name="toolsLeft">
          <summary className={classes.title}>Rich Components</summary>
          <RichComponentsGalleryPod />
        </details>
        <details className={classes.container} name="toolsLeft">
          <summary className={classes.title}>Basic Shapes</summary>
          <BasicShapesGalleryPod />
        </details>
        <details className={classes.container} name="toolsLeft">
          <summary className={classes.title}>Text Components</summary>
          <TextComponetGalleryPod />
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
