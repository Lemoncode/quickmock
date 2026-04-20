import { z } from 'zod';

export const captureWireframeSchema = {
  path: z.string().describe('Relative or absolute path to the .qm file'),
  pageIndex: z
    .number()
    .int()
    .min(0)
    .optional()
    .describe(
      'Zero-based index of the page to capture (default: 0). Use get_wireframe_pages to see all available pages.'
    ),
};
