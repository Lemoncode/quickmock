import { isHeadlessEnv, isVSCodeEnv } from '#common/utils/env.utils.ts';
import { onMessage, sendToExtension } from '#common/utils/vscode-bridge.utils.ts';
import { QuickMockFileContract } from '#core/local-disk/local-disk.model';
import { useCanvasContext } from '#core/providers';
import {
  APP_MESSAGE_TYPE,
  HOST_MESSAGE_TYPE,
  type LoadFilePayload,
} from '@lemoncode/quickmock-bridge-protocol';
import { useEffect, useRef } from 'react';
import { deserializeDocument } from './vscode-sync.utils';

export function useVSCodeFileLoad(): { current: boolean } {
  const { loadDocument, setFileName } = useCanvasContext();

  const loadDocumentRef = useRef(loadDocument);
  const setFileNameRef = useRef(setFileName);
  useEffect(() => {
    loadDocumentRef.current = loadDocument;
    setFileNameRef.current = setFileName;
  });

  const hasReceivedFileRef = useRef(false);

  useEffect(() => {
    if (!isVSCodeEnv()) return;

    const unsubscribe = onMessage(
      HOST_MESSAGE_TYPE.LOAD_FILE,
      (payload: LoadFilePayload) => {
        hasReceivedFileRef.current = true;
        setFileNameRef.current(payload.fileName);
        loadDocumentRef.current(
          deserializeDocument(payload.data as QuickMockFileContract)
        );
      }
    );

    sendToExtension({
      type: isHeadlessEnv()
        ? APP_MESSAGE_TYPE.READY
        : APP_MESSAGE_TYPE.WEBVIEW_READY,
    });

    return unsubscribe;
  }, []);

  return hasReceivedFileRef;
}
