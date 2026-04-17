import { listWireframesHandler } from './list-wireframes.handler'

export const listWireframes = {
  name: 'list_wireframes' as const,
  description:
    'Lists all .qm wireframe files in the current workspace. Returns paths relative to the workspace root.',
  execute: listWireframesHandler,
}
