import { getWireframeJsonHandler } from './get-wireframe-json.handler'
import { getWireframeJsonSchema } from './get-wireframe-json.schema'

export const getWireframeJson = {
  name: 'get_wireframe_json' as const,
  description:
    'Returns the JSON content of a .qm wireframe file. When the file is open in the editor with unsaved changes, returns the latest in-memory state instead of the saved file.',
  schema: getWireframeJsonSchema,
  execute: getWireframeJsonHandler,
}
