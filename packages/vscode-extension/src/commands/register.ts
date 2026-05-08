import * as vscode from 'vscode';
import { registerNewWireframeCommand } from './new-wireframe';

/**
 * Registers all VS Code commands exposed by the extension.
 * @param context The VS Code extension context.
 */
export const registerCommands = (context: vscode.ExtensionContext): void => {
  registerNewWireframeCommand(context);
};
