import { isHeadlessEnv, isVSCodeEnv } from '#common/utils/env.utils.ts';
import { sendToExtension } from '#common/utils/vscode-bridge.utils.ts';
import { useCanvasContext } from '#core/providers';
import { APP_MESSAGE_TYPE } from '@lemoncode/quickmock-bridge-protocol';
import { useEffect, useRef } from 'react';
import { serializeDocument } from './vscode-sync.utils';

const AUTO_SAVE_DEBOUNCE_MS = 500;

export function useVSCodeAutoSave(hasReceivedFileRef: {
  current: boolean;
}): void {
  const { fullDocument, howManyLoadedDocuments } = useCanvasContext();

  const prevLoadCountRef = useRef(howManyLoadedDocuments);
  const lastSavedContentRef = useRef('');
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isVSCodeEnv() || isHeadlessEnv() || !hasReceivedFileRef.current)
      return;

    if (prevLoadCountRef.current !== howManyLoadedDocuments) {
      prevLoadCountRef.current = howManyLoadedDocuments;
      lastSavedContentRef.current = serializeDocument(fullDocument);
      return;
    }

    const content = serializeDocument(fullDocument);

    if (content === lastSavedContentRef.current) return;

    debounceTimerRef.current = setTimeout(() => {
      sendToExtension({
        type: APP_MESSAGE_TYPE.SAVE,
        payload: { content },
      });
      lastSavedContentRef.current = content;
      debounceTimerRef.current = null;
    }, AUTO_SAVE_DEBOUNCE_MS);

    return () => {
      if (debounceTimerRef.current !== null) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
    };
  }, [fullDocument, howManyLoadedDocuments]);
}
