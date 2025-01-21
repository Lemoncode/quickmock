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
import { useAccordionSectionVisibility } from './accordion-section-visibility.hook';
import { useInteractionModeContext } from '@/core/providers';

export const MainScene = () => {
  const { isThumbPagesPodOpen, thumbPagesPodRef } =
    useAccordionSectionVisibility();
  const { interactionMode } = useInteractionModeContext();

  return (
    <MainLayout>
      {interactionMode === 'view' && (
        <div className={`${classes.viewMode}`}>View Mode. Edit on desktop.</div>
      )}
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
        {interactionMode === 'edit' && (
          <>
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
          </>
        )}
      </div>
      <CanvasPod />
      {interactionMode === 'edit' && (
        <div className={classes.rightTools}>
          <PropertiesPod />
        </div>
      )}
      <div className={classes.footer}>
        <FooterPod />
      </div>
    </MainLayout>
  );
};
