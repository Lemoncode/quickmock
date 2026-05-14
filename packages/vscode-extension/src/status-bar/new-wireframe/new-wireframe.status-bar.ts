import { QUICKMOCK_NEW_WIREFRAME_COMMAND_ID } from '#commands';
import * as vscode from 'vscode';

const STATUS_BAR_PRIORITY = 100;

export const registerNewWireframeStatusBarItem = (
  context: vscode.ExtensionContext
): void => {
  const item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    STATUS_BAR_PRIORITY
  );
  item.text = '$(lightbulb) Quickmock';
  item.tooltip = 'Create new Quickmock wireframe';
  item.color = '#309a8a';
  item.command = QUICKMOCK_NEW_WIREFRAME_COMMAND_ID;
  item.show();

  context.subscriptions.push(item);
};
