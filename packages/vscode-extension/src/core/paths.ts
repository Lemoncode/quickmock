import { homedir } from 'node:os';
import { join } from 'node:path';
import * as vscode from 'vscode';

export const MCP_SERVER_ID = 'quickmock';

export const QUICKMOCK_HOME = join(homedir(), '.quickmock');
export const APP_URL_FILE = join(QUICKMOCK_HOME, 'app-url');

const MCP_DIST_SEGMENTS = ['dist', 'mcp', 'index.mjs'] as const;

export const getMcpEntrypointPath = (
  context: vscode.ExtensionContext
): string =>
  vscode.Uri.joinPath(context.extensionUri, ...MCP_DIST_SEGMENTS).fsPath;
