import { z } from 'zod'

export const getWireframePagesSchema = {
  path: z.string().describe('Relative or absolute path to the .qm file'),
}
