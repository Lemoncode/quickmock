import { GalleryComponent } from '@/common/components/gallery/gallery-component';
import { mockLowWireframeCollection } from './low-wireframe-gallery-data';

export const LowWireframeGalleryPod = () => {
  return <GalleryComponent itemCollection={mockLowWireframeCollection} />;
};
