import { logError } from '#core';
import * as vscode from 'vscode';
import { startDocumentBridge } from './document-bridge';
import { registerExternalMcpClients } from './external-clients';
import { registerQuickMockMcpServerProvider } from './vscode-provider';

/**
 * Sets up all MCP integrations for the extension: starts the document bridge, registers the VS Code/Copilot provider, and writes the server config to external MCP clients.
 * @param context The VS Code extension context.
 */
export const setupMcp = (context: vscode.ExtensionContext): void => {
  startDocumentBridge(context).catch(err =>
    logError('Failed to start MCP document bridge:', err)
  );

  context.subscriptions.push(registerQuickMockMcpServerProvider(context));

  try {
    registerExternalMcpClients(context);
  } catch (err) {
    logError('Failed to register external MCP clients:', err);
  }
};
