import { getWireframeAssetsHandler } from './get-wireframe-assets.handler';
import { getWireframeAssetsSchema } from './get-wireframe-assets.schema';

export const getWireframeAssets = {
  name: 'get_wireframe_assets' as const,
  description:
    'Extracts all image assets (logos, content images, etc.) from a .qm wireframe file. ' +
    'Finds every shape of type "image" that has an imageSrc, saves each one as a PNG/JPEG/etc. ' +
    'to "images/<wireframe-name>/" inside the workspace root (or outputDir if provided), ' +
    'and returns the images as inline content so they can be viewed directly.',
  schema: getWireframeAssetsSchema,
  execute: getWireframeAssetsHandler,
};
