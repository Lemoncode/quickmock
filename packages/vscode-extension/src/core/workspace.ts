import * as vscode from 'vscode';

export const getPrimaryWorkspaceFolder = ():
  | vscode.WorkspaceFolder
  | undefined => vscode.workspace.workspaceFolders?.[0];
