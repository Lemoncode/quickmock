import * as vscode from 'vscode';
import { registerNewWireframeStatusBarItem } from './new-wireframe';

/**
 * Registers all VS Code status bar items exposed by the extension.
 * @param context The VS Code extension context.
 */
export const registerStatusBarItems = (
  context: vscode.ExtensionContext
): void => {
  registerNewWireframeStatusBarItem(context);
};
