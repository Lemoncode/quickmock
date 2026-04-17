import { basename } from 'node:path';
import * as vscode from 'vscode';
import { QUICKMOCK_APP_URL } from '#core/constants';
import { documentRegistry } from '#core/document-registry';
import {
  type AppMessage,
  HOST_MESSAGE_TYPE,
  type HostMessage,
} from '#core/protocol';
import {
  openDocument,
  type QuickMockDocument,
  readFile,
  writeFile,
} from './document';
import { handleWebviewMessage } from './handlers';
import { getHtml } from './panel';

export class QuickMockEditorProvider
  implements vscode.CustomEditorProvider<QuickMockDocument>
{
  static register(context: vscode.ExtensionContext): vscode.Disposable {
    return vscode.window.registerCustomEditorProvider(
      'quickmock.editor',
      new QuickMockEditorProvider(context.extensionUri),
      {
        supportsMultipleEditorsPerDocument: false,
        webviewOptions: { retainContextWhenHidden: true },
      }
    );
  }

  constructor(private readonly extensionUri: vscode.Uri) {}

  private readonly _onDidChangeCustomDocument = new vscode.EventEmitter<
    vscode.CustomDocumentContentChangeEvent<QuickMockDocument>
  >();
  readonly onDidChangeCustomDocument = this._onDidChangeCustomDocument.event;

  private readonly panels = new Map<string, vscode.WebviewPanel[]>();

  async openCustomDocument(
    uri: vscode.Uri,
    openContext: vscode.CustomDocumentOpenContext
  ): Promise<QuickMockDocument> {
    const doc = await openDocument(uri, openContext);
    documentRegistry.set(doc.uri.fsPath, doc.content);
    return doc;
  }

  async saveCustomDocument(
    doc: QuickMockDocument,
    _cancel: vscode.CancellationToken
  ): Promise<void> {
    await writeFile(doc.uri, doc.content);
  }

  async saveCustomDocumentAs(
    doc: QuickMockDocument,
    dest: vscode.Uri,
    _cancel: vscode.CancellationToken
  ): Promise<void> {
    await writeFile(dest, doc.content);
  }

  async revertCustomDocument(
    doc: QuickMockDocument,
    _cancel: vscode.CancellationToken
  ): Promise<void> {
    doc.content = await readFile(doc.uri);
    this.broadcast(doc, {
      type: HOST_MESSAGE_TYPE.LOAD,
      payload: { content: doc.content, fileName: basename(doc.uri.fsPath) },
    });
  }

  async backupCustomDocument(
    doc: QuickMockDocument,
    context: vscode.CustomDocumentBackupContext,
    _cancel: vscode.CancellationToken
  ): Promise<vscode.CustomDocumentBackup> {
    await writeFile(context.destination, doc.content);
    return {
      id: context.destination.toString(),
      delete: () => {
        vscode.workspace.fs.delete(context.destination).then(
          undefined,
          () => {}
        );
      },
    };
  }

  resolveCustomEditor(
    doc: QuickMockDocument,
    panel: vscode.WebviewPanel,
    _token: vscode.CancellationToken
  ): void {
    const key = doc.uri.toString();
    this.panels.set(key, [...(this.panels.get(key) ?? []), panel]);
    panel.onDidDispose(() => {
      const remaining = (this.panels.get(key) ?? []).filter((p) => p !== panel);
      this.panels.set(key, remaining);
      if (remaining.length === 0) {
        documentRegistry.delete(doc.uri.fsPath);
      }
    });

    panel.webview.options = {
      enableScripts: true,
      localResourceRoots: [this.extensionUri],
    };
    panel.webview.html = getHtml(
      panel.webview,
      this.extensionUri,
      QUICKMOCK_APP_URL
    );

    panel.webview.onDidReceiveMessage(async (msg: AppMessage) => {
      await handleWebviewMessage(msg, doc, (reply) =>
        panel.webview.postMessage(reply satisfies HostMessage)
      );
      documentRegistry.set(doc.uri.fsPath, doc.content);
    });
  }

  private broadcast(doc: QuickMockDocument, msg: HostMessage): void {
    for (const panel of this.panels.get(doc.uri.toString()) ?? []) {
      panel.webview.postMessage(msg);
    }
  }
}
