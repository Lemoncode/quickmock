import * as vscode from 'vscode';

export const registerNewWireframeCommand = (
  context: vscode.ExtensionContext
): void => {
  context.subscriptions.push(
    vscode.commands.registerCommand('quickmock.newWireframe', () => {
      vscode.window.showInformationMessage('New wireframe coming soon'); // TODO: Implement the actual functionality for creating a new wireframe
    })
  );
};
