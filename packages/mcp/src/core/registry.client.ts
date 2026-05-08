import { readFileSync } from 'node:fs';
import {
  buildPortFilePath,
  DOCUMENT_ROUTE,
  LOOPBACK_HOST,
  parsePortFile,
  TOKEN_HEADER,
} from '@lemoncode/quickmock-registry-protocol';
import { nullClient, type RegistryClient } from './registry.models';

const REQUEST_TIMEOUT_MS = 2_000;

function readPortFile(workspaceRoot: string) {
  try {
    const raw = readFileSync(buildPortFilePath(workspaceRoot), 'utf-8');
    return parsePortFile(raw);
  } catch {
    return null;
  }
}

/** HTTP client for the VSCode extension's registry server. Falls back to nullClient when the extension is not running. */
export function createRegistryClient(): RegistryClient {
  const workspaceRoot = process.env.QM_WORKSPACE_ROOT ?? process.cwd();
  const portFile = readPortFile(workspaceRoot);
  if (!portFile) return nullClient;
  const { port, token } = portFile;

  return {
    async getDocument(fsPath: string): Promise<string | null> {
      try {
        const url = `http://${LOOPBACK_HOST}:${port}${DOCUMENT_ROUTE}?path=${encodeURIComponent(fsPath)}`;
        const res = await fetch(url, {
          headers: { [TOKEN_HEADER]: token },
          signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        });
        if (!res.ok) return null;
        return await res.text();
      } catch {
        return null;
      }
    },
  };
}
