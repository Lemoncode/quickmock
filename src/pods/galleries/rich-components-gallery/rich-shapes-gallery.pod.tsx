import { GalleryComponent } from '@/common/components/gallery/gallery-component';
import { mockRichComponentsCollection } from './rich-components-gallery-data';

export const RichComponentsGalleryPod = () => {
  return <GalleryComponent itemCollection={mockRichComponentsCollection} />;
};
