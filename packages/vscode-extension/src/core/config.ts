import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import * as vscode from 'vscode';
import { logError } from './logger';
import { APP_URL_FILE } from './paths';

const SECTION = 'quickmock';
const APP_URL_KEY = 'appUrl';
const FULL_KEY = `${SECTION}.${APP_URL_KEY}`;
const DEFAULT_APP_URL = 'https://quickmock.net/editor.html';

const EDITOR_PARAMS = { env: 'vscode' } as const;
const HEADLESS_PARAMS = { env: 'vscode', headless: '1' } as const;

const readRawAppUrl = (): string => {
  const value = vscode.workspace
    .getConfiguration(SECTION)
    .get<string>(APP_URL_KEY);
  return value?.trim() || DEFAULT_APP_URL;
};

const withParams = (url: string, params: Record<string, string>): string => {
  const parsed = new URL(url);
  for (const [k, v] of Object.entries(params)) parsed.searchParams.set(k, v);
  return parsed.toString();
};

export const getEditorAppUrl = (): string =>
  withParams(readRawAppUrl(), EDITOR_PARAMS);

export const getHeadlessAppUrl = (): string =>
  withParams(readRawAppUrl(), HEADLESS_PARAMS);

export const syncAppUrlFile = (): void => {
  try {
    mkdirSync(dirname(APP_URL_FILE), { recursive: true });
    writeFileSync(APP_URL_FILE, getHeadlessAppUrl(), 'utf-8');
  } catch (err) {
    logError('Failed to write app URL file:', err);
  }
};

export const onAppUrlChange = (listener: () => void): vscode.Disposable =>
  vscode.workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration(FULL_KEY)) listener();
  });
