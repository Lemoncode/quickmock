import { onAppUrlChange, syncAppUrlFile } from '#core/config';
import { logError } from '#core/logger';
import { QuickMockEditorProvider } from '#editor/provider';
import { registerMcpServer } from '#mcp/mcp-registration';
import { RegistryServer } from '#mcp/registry-server';
import { registerQuickMockMcpServerProvider } from '#mcp/server-definition-provider';
import * as vscode from 'vscode';

export const activate = (context: vscode.ExtensionContext) => {
  syncAppUrlFile();
  context.subscriptions.push(onAppUrlChange(syncAppUrlFile));

  context.subscriptions.push(QuickMockEditorProvider.register(context));

  const registryServer = new RegistryServer();
  registryServer
    .start(context)
    .catch(err => logError('Failed to start MCP registry server:', err));

  context.subscriptions.push(registerQuickMockMcpServerProvider(context));

  registerMcpServer(context).catch(err =>
    logError('Failed to register MCP server:', err)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('quickmock.newWireframe', () => {
      vscode.window.showInformationMessage('New wireframe coming soon');
    })
  );
};

export const deactivate = () => {};
