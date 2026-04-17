import * as vscode from 'vscode';
import { QUICKMOCK_APP_URL } from '#core/constants';

const PROVIDER_ID = 'quickmock';
const SERVER_LABEL = 'QuickMock Wireframe Tools';
const SERVER_VERSION = '0.0.1';

const QUICKMOCK_HEADLESS_URL = `${QUICKMOCK_APP_URL}&headless=1`;

export const registerQuickMockMcpServerProvider = (
  context: vscode.ExtensionContext
): vscode.Disposable => {
  const didChangeDefinitions = new vscode.EventEmitter<void>();
  console.info('[QuickMock] Registering MCP server definition provider');

  context.subscriptions.push(
    didChangeDefinitions,
    vscode.workspace.onDidChangeWorkspaceFolders(() =>
      didChangeDefinitions.fire()
    )
  );

  return vscode.lm.registerMcpServerDefinitionProvider(PROVIDER_ID, {
    onDidChangeMcpServerDefinitions: didChangeDefinitions.event,
    provideMcpServerDefinitions: async (_token) => {
      console.info('[QuickMock] Providing MCP server definitions');
      const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
      if (!workspaceFolder) {
        console.info('[QuickMock] No workspace folder available for MCP server');
        return [];
      }

      return [
        new vscode.McpStdioServerDefinition(
          SERVER_LABEL,
          'node',
          [
            vscode.Uri.joinPath(
              context.extensionUri,
              'dist',
              'mcp-server.mjs'
            ).fsPath,
          ],
          {
            QM_WORKSPACE_ROOT: workspaceFolder.uri.fsPath,
            QM_APP_URL: QUICKMOCK_HEADLESS_URL,
          },
          SERVER_VERSION
        ),
      ];
    },
    resolveMcpServerDefinition: async (server, _token) => {
      console.info('[QuickMock] Resolving MCP server definition');
      return server;
    },
  });
};
