import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import * as vscode from 'vscode';

export const MCP_SERVER_ID = 'quickmock';

const MCP_PKG = '@lemoncode/quickmock-mcp';

export interface McpInvocation {
  command: string;
  args: string[];
}

// Production: spawn the MCP from the published npm package via npx.
// Development: spawn the local workspace build so changes are picked up on rebuild.
export const getMcpInvocation = (
  context: vscode.ExtensionContext
): McpInvocation =>
  context.extensionMode === vscode.ExtensionMode.Production
    ? { command: 'npx', args: ['-y', MCP_PKG] }
    : { command: 'node', args: [resolveLocalMcpEntry()] };

const resolveLocalMcpEntry = (): string => {
  const require = createRequire(import.meta.url);
  const pkgJsonPath = require.resolve(`${MCP_PKG}/package.json`);
  return join(dirname(pkgJsonPath), 'dist', 'index.mjs');
};
