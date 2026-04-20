import { randomBytes } from 'node:crypto';
import { unlinkSync, writeFileSync } from 'node:fs';
import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from 'node:http';
import {
  buildPortFilePath,
  DOCUMENT_ROUTE,
  encodePortFile,
  LOOPBACK_HOST,
  TOKEN_HEADER,
} from '@lemoncode/quickmock-registry-protocol';
import * as vscode from 'vscode';
import { documentRegistry } from '#core/document-registry';

const TOKEN_BYTE_LENGTH = 32;
const PORT_FILE_MODE = 0o600;

export class RegistryServer {
  private portFile: string | null = null;
  private token = '';

  async start(context: vscode.ExtensionContext): Promise<void> {
    const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspaceRoot) {
      return;
    }

    this.portFile = buildPortFilePath(workspaceRoot);
    this.token = randomBytes(TOKEN_BYTE_LENGTH).toString('hex');

    const server = createServer((req, res) => this.handleRequest(req, res));

    await new Promise<void>((resolve, reject) => {
      server.on('error', reject);
      server.listen(0, LOOPBACK_HOST, () => {
        const { port } = server.address() as { port: number };
        try {
          writeFileSync(this.portFile!, encodePortFile(port, this.token), {
            mode: PORT_FILE_MODE,
          });
        } catch (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });

    context.subscriptions.push({
      dispose: () => {
        server.close();
        if (this.portFile) {
          try {
            unlinkSync(this.portFile);
          } catch {}
        }
      },
    });
  }

  private handleRequest(req: IncomingMessage, res: ServerResponse): void {
    if (req.headers[TOKEN_HEADER] !== this.token) {
      res.writeHead(401);
      res.end();
      return;
    }

    const url = new URL(req.url ?? '/', 'http://localhost');

    if (url.pathname !== DOCUMENT_ROUTE) {
      res.writeHead(404);
      res.end();
      return;
    }

    const path = url.searchParams.get('path');
    if (!path) {
      res.writeHead(400);
      res.end('Missing path parameter');
      return;
    }

    const content = documentRegistry.get(path);
    if (content === undefined) {
      res.writeHead(404);
      res.end('Document not open in editor');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(content);
  }
}
