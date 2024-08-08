import { GalleryComponent } from '@/common/components/gallery/gallery-component';
import { mockBasicShapesCollection } from '../basic-shapes-gallery/basic-gallery-data';

export const BasicShapesGalleryPod = () => {
  return <GalleryComponent itemCollection={mockBasicShapesCollection} />;
};
