import { GalleryComponent } from '@/common/components/gallery/gallery-component';
import { mockTextCollection } from './low-wireframe-gallery-data';

export const LowWireframeGalleryPod = () => {
  return <GalleryComponent itemCollection={mockTextCollection} />;
};
