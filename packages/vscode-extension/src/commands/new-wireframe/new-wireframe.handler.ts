import { getPrimaryWorkspaceFolder } from '#core';
import { writeFile } from '#editor/document';
import {
  createEmptyQuickMockContent,
  DEFAULT_QUICKMOCK_FILE_NAME,
  QUICKMOCK_FILE_EXTENSION,
} from '#editor/template';
import * as vscode from 'vscode';

const CUSTOM_EDITOR_VIEW_TYPE = 'quickmock.editor';

const pickSaveTarget = async (): Promise<vscode.Uri | undefined> => {
  const folder = getPrimaryWorkspaceFolder();
  const defaultUri = folder
    ? vscode.Uri.joinPath(folder.uri, DEFAULT_QUICKMOCK_FILE_NAME)
    : undefined;

  return vscode.window.showSaveDialog({
    defaultUri,
    filters: { 'QuickMock Wireframe': [QUICKMOCK_FILE_EXTENSION] },
    saveLabel: 'Create',
    title: 'Create QuickMock File',
  });
};

export const handleNewWireframe = async (): Promise<void> => {
  const target = await pickSaveTarget();
  if (!target) return;

  try {
    await writeFile(target, createEmptyQuickMockContent());
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    vscode.window.showErrorMessage(
      `Failed to create QuickMock file: ${message}`
    );
    return;
  }

  await vscode.commands.executeCommand(
    'vscode.openWith',
    target,
    CUSTOM_EDITOR_VIEW_TYPE
  );
};
