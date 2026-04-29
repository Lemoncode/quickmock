import { getWireframePagesHandler } from './get-wireframe-pages.handler';
import { getWireframePagesSchema } from './get-wireframe-pages.schema';

export const getWireframePages = {
  name: 'get_wireframe_pages' as const,
  description:
    'Returns the list of pages in a .qm wireframe file with their index, id, name, and shape count. ' +
    'Use the index values with capture_wireframe to screenshot a specific page.',
  schema: getWireframePagesSchema,
  execute: getWireframePagesHandler,
};
