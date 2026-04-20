import { z } from 'zod';

export const getWireframeJsonSchema = {
  path: z.string().describe('Relative or absolute path to the .qm file'),
};
