// The SDK's `exports` wildcard maps `./*` → `./dist/esm/*` without `.js`,
// so Node ESM cannot resolve subpath imports at runtime.
// See https://github.com/modelcontextprotocol/typescript-sdk/issues/440
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createWireframeFileService } from './commons/wireframe-file.service';
import { createRegistryClient } from './core';
import { logError } from './core/mcp.logger';
import { captureWireframe } from './tools/capture-wireframe';
import { getWireframeAssets } from './tools/get-wireframe-assets';
import { getWireframeJson } from './tools/get-wireframe-json';
import { getWireframePages } from './tools/get-wireframe-pages';
import { listWireframes } from './tools/list-wireframes';

const registry = createRegistryClient();
const service = createWireframeFileService(registry);

const server = new McpServer({ name: 'quickmock', version: '0.1.0' });

server.registerTool(
  listWireframes.name,
  { description: listWireframes.description },
  () => listWireframes.execute()
);

server.registerTool(
  getWireframeJson.name,
  {
    description: getWireframeJson.description,
    inputSchema: getWireframeJson.schema,
  },
  args => getWireframeJson.execute(args, service)
);

server.registerTool(
  getWireframePages.name,
  {
    description: getWireframePages.description,
    inputSchema: getWireframePages.schema,
  },
  args => getWireframePages.execute(args, service)
);

server.registerTool(
  captureWireframe.name,
  {
    description: captureWireframe.description,
    inputSchema: captureWireframe.schema,
  },
  args => captureWireframe.execute(args, service)
);

server.registerTool(
  getWireframeAssets.name,
  {
    description: getWireframeAssets.description,
    inputSchema: getWireframeAssets.schema,
  },
  args => getWireframeAssets.execute(args, service)
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(err => {
  logError('fatal error:', err);
  process.exit(1);
});
