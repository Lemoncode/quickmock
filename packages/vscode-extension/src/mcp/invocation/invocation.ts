import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import * as vscode from 'vscode';
import { MCP_PKG } from './constants';
import type { McpInvocation } from './model';

/**
 * Resolves how the MCP child process should be spawned for the current extension mode.
 * In production it points to the published npm package via `npx`; in development it points to the local workspace build so changes are picked up on rebuild.
 * @param context The VS Code extension context.
 * @returns The command and arguments to spawn the MCP process.
 */
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
