import { execSync, type ExecSyncOptions } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { ROOT, VSCODE_EXTENSION_PATHS } from './publish.constants';

interface PackageJson {
  private?: boolean;
  [key: string]: unknown;
}

const markAsPrivate = async (
  pkgPath: string
): Promise<{ path: string; original: string }> => {
  const fullPath = resolve(ROOT, pkgPath, 'package.json');
  const original = await readFile(fullPath, 'utf-8');
  const pkg: PackageJson = JSON.parse(original);
  pkg.private = true;
  await writeFile(fullPath, JSON.stringify(pkg, null, 2));
  return { path: fullPath, original };
};

const restoreAll = async (
  backups: Array<{ path: string; original: string }>
) => {
  for (const { path, original } of backups) {
    await writeFile(path, original);
  }
};

const main = async () => {
  const backups = await Promise.all(VSCODE_EXTENSION_PATHS.map(markAsPrivate));

  const opts: ExecSyncOptions = { stdio: 'inherit', cwd: ROOT };

  try {
    execSync('changeset publish', opts);
  } finally {
    await restoreAll(backups);
  }
};

main();
