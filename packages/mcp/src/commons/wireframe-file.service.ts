import type { RegistryClient } from '../core';
import type { QmFile } from './qm-file.models';
import { readQmFile } from './qm-file.utils';

export interface WireframeFileService {
  readFile(path: string): Promise<QmFile>;
}

export function createWireframeFileService(
  registry: RegistryClient
): WireframeFileService {
  return {
    readFile: (path: string) => readQmFile(path, registry),
  };
}
