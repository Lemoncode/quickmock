import { MainLayout } from '#layout/main.layout';
import classes from './main.module.css';

import { isHeadlessEnv } from '#common/utils/env.utils.ts';
import { useInteractionModeContext } from '#core/providers';
import {
  BasicShapesGalleryPod,
  CanvasPod,
  ComponentGalleryPod,
  ContainerGalleryPod,
  LowWireframeGalleryPod,
  RichComponentsGalleryPod,
  TextComponetGalleryPod,
  ToolbarPod,
} from '#pods';
import { FooterPod } from '#pods/footer/footer.pod';
import { PropertiesPod } from '#pods/properties';
import { ThumbPagesPod } from '#pods/thumb-pages';
import { useAccordionSectionVisibility } from './accordion-section-visibility.hook';

export const MainScene = () => {
  const { isThumbPagesPodOpen, thumbPagesPodRef } =
    useAccordionSectionVisibility();
  const { interactionMode } = useInteractionModeContext();

  if (isHeadlessEnv()) {
    return (
      <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <CanvasPod />
      </div>
    );
  }

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
            <details className={classes.container} name="toolsLeft">
              <summary className={classes.title}>Low Wireframes</summary>
              <LowWireframeGalleryPod />
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
