import * as vscode from 'vscode';

export const activate = (context: vscode.ExtensionContext) => {
  const disposable = vscode.commands.registerCommand(
    'quickmock.helloWorld',
    () => {
      vscode.window.showInformationMessage('Quickmock extension is running!');
    }
  );

  context.subscriptions.push(disposable);
};

export const deactivate = () => {};
