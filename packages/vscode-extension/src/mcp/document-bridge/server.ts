import { documentRegistry, getPrimaryWorkspaceFolder } from '#core';
import {
  buildPortFilePath,
  DOCUMENT_ROUTE,
  encodePortFile,
  LOOPBACK_HOST,
  TOKEN_HEADER,
} from '@lemoncode/quickmock-registry-protocol';
import { randomBytes } from 'node:crypto';
import { unlinkSync, writeFileSync } from 'node:fs';
import {
  createServer,
  type IncomingMessage,
  type ServerResponse,
} from 'node:http';
import * as vscode from 'vscode';
import { PORT_FILE_MODE, TOKEN_BYTE_LENGTH } from './constants';

/**
 * Starts the MCP document bridge server, which serves the content of documents open in the editor to the MCP server.
 * @param context The VS Code extension context.
 * @returns A promise that resolves when the server has started.
 */
export const startDocumentBridge = async (
  context: vscode.ExtensionContext
): Promise<void> => {
  const workspaceRoot = getPrimaryWorkspaceFolder()?.uri.fsPath;
  if (!workspaceRoot) return;

  const portFile = buildPortFilePath(workspaceRoot);
  const token = randomBytes(TOKEN_BYTE_LENGTH).toString('hex');

  const handleRequest = (req: IncomingMessage, res: ServerResponse): void => {
    if (req.headers[TOKEN_HEADER] !== token) {
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
  };

  const server = createServer(handleRequest);

  await new Promise<void>((resolve, reject) => {
    server.on('error', reject);
    // Get the assigned port and write it to the port file
    server.listen(0, LOOPBACK_HOST, () => {
      const { port } = server.address() as { port: number };
      try {
        writeFileSync(portFile, encodePortFile(port, token), {
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
      try {
        unlinkSync(portFile);
      } catch {}
    },
  });
};
