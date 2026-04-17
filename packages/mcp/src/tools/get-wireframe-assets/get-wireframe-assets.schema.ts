import { z } from 'zod'

export const getWireframeAssetsSchema = {
  path: z.string().describe('Relative or absolute path to the .qm file'),
  outputDir: z
    .string()
    .optional()
    .describe(
      'Directory where PNG files will be saved. ' +
        'Relative paths are resolved from the workspace root. ' +
        'Defaults to "images/<wireframe-name>" inside the workspace root.',
    ),
}
