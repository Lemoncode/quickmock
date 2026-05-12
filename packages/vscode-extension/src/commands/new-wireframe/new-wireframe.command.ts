import * as vscode from 'vscode';
import { QUICKMOCK_NEW_WIREFRAME_COMMAND_ID } from './new-wireframe.id';
import { handleNewWireframe } from './new-wireframe.handler';

export const registerNewWireframeCommand = (
  context: vscode.ExtensionContext
): void => {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      QUICKMOCK_NEW_WIREFRAME_COMMAND_ID,
      handleNewWireframe
    )
  );
};
