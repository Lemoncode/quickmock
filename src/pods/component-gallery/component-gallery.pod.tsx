import { GalleryComponent } from '@/common/components/gallery/gallery-component';
import { mockWidgetCollection } from './component-gallery-data';

export const ComponentGalleryPod = () => {
  return (
    <>
      <GalleryComponent itemCollection={mockWidgetCollection} />
    </>
  );
};
