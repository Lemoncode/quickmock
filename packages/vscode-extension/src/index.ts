import * as vscode from 'vscode';
import { QuickMockEditorProvider } from '#editor/provider';
import { registerConnectMcpCommand } from '#mcp/mcp-command';
import { registerMcpServer } from '#mcp/mcp-registration';
import { RegistryServer } from '#mcp/registry-server';
import { registerQuickMockMcpServerProvider } from '#mcp/server-definition-provider';

export const activate = (context: vscode.ExtensionContext) => {
  context.subscriptions.push(QuickMockEditorProvider.register(context));

  const registryServer = new RegistryServer();
  registryServer
    .start(context)
    .catch((err) =>
      console.error('[QuickMock] Failed to start MCP registry server:', err)
    );

  context.subscriptions.push(registerQuickMockMcpServerProvider(context));
  context.subscriptions.push(registerConnectMcpCommand(context));

  registerMcpServer(context).catch((err) =>
    console.error('[QuickMock] Failed to register MCP server:', err)
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('quickmock.newWireframe', () => {
      vscode.window.showInformationMessage('New wireframe coming soon');
    })
  );
};

export const deactivate = () => {};
