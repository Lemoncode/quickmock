import { getPrimaryWorkspaceFolder, logInfo, onAppUrlChange } from '#core';
import * as vscode from 'vscode';
import { MCP_SERVER_ID } from '../invocation';
import { buildMcpDefinition } from './definition';

/**
 * Registers QuickMock as an MCP server definition provider for VS Code, so Copilot (and any other consumer of the official VS Code MCP API) can discover and launch it.
 * Re-emits the change event when the workspace folders or the configured editor URL change, so VS Code re-queries the definition with fresh values.
 * @param context The VS Code extension context.
 * @returns A Disposable that unregisters the provider and detaches the listeners.
 */
export const registerQuickMockMcpServerProvider = (
  context: vscode.ExtensionContext
): vscode.Disposable => {
  logInfo('Registering MCP server definition provider');

  const didChangeDefinitions = new vscode.EventEmitter<void>();

  const providerRegistration = vscode.lm.registerMcpServerDefinitionProvider(
    MCP_SERVER_ID,
    {
      onDidChangeMcpServerDefinitions: didChangeDefinitions.event,
      provideMcpServerDefinitions: async () => {
        const workspaceFolder = getPrimaryWorkspaceFolder();
        if (!workspaceFolder) {
          logInfo('No workspace folder available for MCP server');
          return [];
        }
        return [buildMcpDefinition(context, workspaceFolder)];
      },
      resolveMcpServerDefinition: async server => {
        const workspaceFolder = getPrimaryWorkspaceFolder();
        if (
          !workspaceFolder ||
          !(server instanceof vscode.McpStdioServerDefinition)
        ) {
          return server;
        }
        const fresh = buildMcpDefinition(context, workspaceFolder);
        server.command = fresh.command;
        server.args = fresh.args;
        server.env = fresh.env;
        server.version = fresh.version;
        return server;
      },
    }
  );

  return vscode.Disposable.from(
    providerRegistration,
    didChangeDefinitions,
    vscode.workspace.onDidChangeWorkspaceFolders(() =>
      didChangeDefinitions.fire()
    ),
    onAppUrlChange(() => didChangeDefinitions.fire())
  );
};
