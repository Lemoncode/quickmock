import { createHash } from 'node:crypto';
import * as vscode from 'vscode';
import { getHeadlessAppUrl, onAppUrlChange } from '#core/config';
import { logInfo } from '#core/logger';
import { getMcpEntrypointPath, MCP_SERVER_ID } from '#core/paths';
import { version as EXTENSION_VERSION } from '../../package.json';

const SERVER_LABEL = 'QuickMock Wireframe Tools';
const VERSION_HASH_ALGO = 'sha1';
const VERSION_HASH_LENGTH = 8;

const buildDefinition = (
  context: vscode.ExtensionContext,
  workspaceFolder: vscode.WorkspaceFolder
): vscode.McpStdioServerDefinition => {
  const versionSuffix = createHash(VERSION_HASH_ALGO)
    .update(getHeadlessAppUrl())
    .digest('hex')
    .slice(0, VERSION_HASH_LENGTH);

  return new vscode.McpStdioServerDefinition(
    SERVER_LABEL,
    'node',
    [getMcpEntrypointPath(context)],
    { QM_WORKSPACE_ROOT: workspaceFolder.uri.fsPath },
    `${EXTENSION_VERSION}+${versionSuffix}`
  );
};

export const registerQuickMockMcpServerProvider = (
  context: vscode.ExtensionContext
): vscode.Disposable => {
  const didChangeDefinitions = new vscode.EventEmitter<void>();
  logInfo('Registering MCP server definition provider');

  let providerRegistration: vscode.Disposable | undefined;

  const register = () => {
    providerRegistration?.dispose();
    providerRegistration = vscode.lm.registerMcpServerDefinitionProvider(
      MCP_SERVER_ID,
      {
        onDidChangeMcpServerDefinitions: didChangeDefinitions.event,
        provideMcpServerDefinitions: async (_token) => {
          logInfo('Providing MCP server definitions');
          const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
          if (!workspaceFolder) {
            logInfo('No workspace folder available for MCP server');
            return [];
          }
          return [buildDefinition(context, workspaceFolder)];
        },
        resolveMcpServerDefinition: async (server, _token) => {
          logInfo('Resolving MCP server definition');
          const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
          if (
            !workspaceFolder ||
            !(server instanceof vscode.McpStdioServerDefinition)
          ) {
            return server;
          }
          const fresh = buildDefinition(context, workspaceFolder);
          server.command = fresh.command;
          server.args = fresh.args;
          server.env = fresh.env;
          server.version = fresh.version;
          return server;
        },
      }
    );
  };

  register();

  const subscriptions: vscode.Disposable[] = [
    didChangeDefinitions,
    vscode.workspace.onDidChangeWorkspaceFolders(() =>
      didChangeDefinitions.fire()
    ),
    onAppUrlChange(() => {
      logInfo('appUrl changed, re-registering MCP provider');
      register();
      didChangeDefinitions.fire();
    }),
    { dispose: () => providerRegistration?.dispose() },
  ];

  return vscode.Disposable.from(...subscriptions);
};
