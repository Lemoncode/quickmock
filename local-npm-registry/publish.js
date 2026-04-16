import { execSync, spawn } from 'node:child_process';
import { resolve } from 'node:path';

const REGISTRY_URL = 'http://localhost:4873';
const ROOT = resolve(import.meta.dirname, '..');
const CONFIG = resolve(import.meta.dirname, 'config.yaml');

const command = process.argv[2];

const startVerdaccio = () =>
  spawn('npx', ['verdaccio', '--config', CONFIG, '--listen', '4873'], {
    cwd: import.meta.dirname,
    stdio: 'inherit',
    shell: true,
  });

const waitForRegistry = async (url, retries = 30, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise(r => setTimeout(r, delay));
  }
  throw new Error(`Registry at ${url} did not start in time`);
};

const run = (cmd, opts = {}) =>
  execSync(cmd, {
    stdio: 'inherit',
    cwd: ROOT,
    env: { ...process.env, npm_config_registry: REGISTRY_URL },
    ...opts,
  });

if (command === 'start') {
  // Just start Verdaccio (foreground)
  const child = startVerdaccio();
  child.on('exit', code => process.exit(code ?? 0));
} else if (command === 'publish') {
  // Full flow: start Verdaccio → changeset version → changeset publish → stop
  const child = startVerdaccio();

  try {
    console.log('Waiting for Verdaccio to start...');
    await waitForRegistry(REGISTRY_URL);
    console.log('Verdaccio ready. Running changeset version...');
    run('npx changeset version');
    console.log('Publishing to local registry...');
    run('npx changeset publish');
    console.log('Done! Packages published to local Verdaccio.');
  } finally {
    child.kill();
  }
} else {
  console.error('Usage: node publish.js <start|publish>');
  process.exit(1);
}
