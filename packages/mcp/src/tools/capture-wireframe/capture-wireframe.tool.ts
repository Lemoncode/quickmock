import { captureWireframeHandler } from './capture-wireframe.handler';
import { captureWireframeSchema } from './capture-wireframe.schema';

export const captureWireframe = {
  name: 'capture_wireframe' as const,
  description:
    'Returns a PNG screenshot of a fully-rendered .qm wireframe file. ' +
    'Use get_wireframe_pages first to discover available pages and their indices. ',
  schema: captureWireframeSchema,
  execute: captureWireframeHandler,
};
