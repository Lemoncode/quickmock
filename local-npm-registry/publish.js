import childProcess from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

const [...publishCommandArgs] = process.argv.slice(2);
const localRegistryConfig = `registry=http://localhost:4873
//localhost:4873/:_authToken="local-token"
@lemoncode:registry=http://localhost:4873
`;
const publishCommand = publishCommandArgs.join(' ');
const NPMRC_FILE_PATH = path.resolve(process.cwd(), '.npmrc');

let originalContent = '';
try {
  originalContent = await fs.readFile(NPMRC_FILE_PATH, 'utf-8');
} catch {
  originalContent = '';
}

try {
  const newContent = originalContent.trimEnd() + '\n' + localRegistryConfig;
  await fs.writeFile(NPMRC_FILE_PATH, newContent);
  childProcess.execSync(`${publishCommand}`, { stdio: 'inherit', shell: true });
} finally {
  await fs.writeFile(NPMRC_FILE_PATH, originalContent);
}
