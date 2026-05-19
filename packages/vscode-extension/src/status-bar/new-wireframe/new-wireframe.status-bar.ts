import { QUICKMOCK_NEW_WIREFRAME_COMMAND_ID } from '#commands';
import * as vscode from 'vscode';
import {
  ITEM_COLOR,
  ITEM_TEXT,
  ITEM_TOOLTIP,
  STATUS_BAR_PRIORITY,
} from './new-wireframe.consts';

export const registerNewWireframeStatusBarItem = (
  context: vscode.ExtensionContext
): void => {
  const item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    STATUS_BAR_PRIORITY
  );
  item.text = ITEM_TEXT;
  item.tooltip = ITEM_TOOLTIP;
  item.color = ITEM_COLOR;
  item.command = QUICKMOCK_NEW_WIREFRAME_COMMAND_ID;
  item.show();

  context.subscriptions.push(item);
};
