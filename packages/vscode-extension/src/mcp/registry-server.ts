import { createHash } from 'node:crypto';
import { unlinkSync, writeFileSync } from 'node:fs';
import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from 'node:http';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import * as vscode from 'vscode';
import { documentRegistry } from '#core/document-registry';

export class RegistryServer {
  private portFile: string | null = null;

  async start(context: vscode.ExtensionContext): Promise<void> {
    const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
    if (!workspaceRoot) {
      return;
    }

    const hash = workspaceHash(workspaceRoot);
    this.portFile = join(tmpdir(), `quickmock-${hash}.port`);

    const server = createServer((req, res) => this.handleRequest(req, res));

    await new Promise<void>((resolve, reject) => {
      server.on('error', reject);
      server.listen(0, '127.0.0.1', () => {
        const addr = server.address() as { port: number };
        try {
          writeFileSync(this.portFile!, String(addr.port), 'utf-8');
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
    const url = new URL(req.url ?? '/', 'http://localhost');

    if (url.pathname !== '/document') {
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

const workspaceHash = (root: string): string =>
  createHash('md5').update(root).digest('hex').slice(0, 8);
