import { registerCommands } from '#commands';
import { onAppUrlChange, syncAppUrlFile } from '#core';
import { QuickMockEditorProvider } from '#editor';
import { setupMcp } from '#mcp';
import * as vscode from 'vscode';

export const activate = (context: vscode.ExtensionContext) => {
  syncAppUrlFile();
  context.subscriptions.push(onAppUrlChange(syncAppUrlFile));
  context.subscriptions.push(QuickMockEditorProvider.register(context));
  setupMcp(context);
  registerCommands(context);
};

export const deactivate = () => {};
