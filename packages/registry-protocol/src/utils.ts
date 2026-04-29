import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { PORT_TOKEN_SEPARATOR, WORKSPACE_HASH_LENGTH } from './constant';

export function buildPortFilePath(workspaceRoot: string): string {
  const hash = createHash('md5')
    .update(workspaceRoot)
    .digest('hex')
    .slice(0, WORKSPACE_HASH_LENGTH);
  return join(tmpdir(), `quickmock-${hash}.port`);
}

export function encodePortFile(port: number, token: string): string {
  return `${port}${PORT_TOKEN_SEPARATOR}${token}`;
}

export function parsePortFile(
  raw: string
): { port: number; token: string } | null {
  const [portStr, token] = raw.trim().split(PORT_TOKEN_SEPARATOR);
  const port = Number.parseInt(portStr ?? '', 10);
  if (Number.isNaN(port) || !token) return null;
  return { port, token };
}
