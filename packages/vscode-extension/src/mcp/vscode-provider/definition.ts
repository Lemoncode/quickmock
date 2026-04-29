import { getHeadlessAppUrl } from '#core';
import { createHash } from 'node:crypto';
import * as vscode from 'vscode';
import { version as EXTENSION_VERSION } from '../../../package.json';
import { getMcpInvocation } from '../invocation';

const SERVER_LABEL = 'QuickMock Wireframe Tools';
const VERSION_HASH_ALGO = 'sha1';
const VERSION_HASH_LENGTH = 8;

// Suffix the extension version with a hash of the headless URL so VS Code
// re-launches the MCP whenever the user points at a different editor URL.
const buildVersion = (): string => {
  const suffix = createHash(VERSION_HASH_ALGO)
    .update(getHeadlessAppUrl())
    .digest('hex')
    .slice(0, VERSION_HASH_LENGTH);
  return `${EXTENSION_VERSION}+${suffix}`;
};

export const buildMcpDefinition = (
  context: vscode.ExtensionContext,
  workspaceFolder: vscode.WorkspaceFolder
): vscode.McpStdioServerDefinition => {
  const { command, args } = getMcpInvocation(context);
  return new vscode.McpStdioServerDefinition(
    SERVER_LABEL,
    command,
    args,
    { QM_WORKSPACE_ROOT: workspaceFolder.uri.fsPath },
    buildVersion()
  );
};
