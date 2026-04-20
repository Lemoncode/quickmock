import { cp, mkdir, rm } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const here = dirname(fileURLToPath(import.meta.url));

const mcpDir = dirname(
  require.resolve('@lemoncode/quickmock-mcp/package.json')
);
const source = join(mcpDir, 'dist');

const distDir = join(here, '..', 'dist');
const target = join(distDir, 'mcp');

await mkdir(distDir, { recursive: true });
await rm(target, { recursive: true, force: true });
await cp(source, target, { recursive: true });
