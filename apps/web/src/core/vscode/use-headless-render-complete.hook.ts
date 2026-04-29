import { computeContentBbox } from '#common/utils/compute-content-bbox.utils.ts';
import { isHeadlessEnv } from '#common/utils/env.utils.ts';
import { sendToExtension } from '#common/utils/vscode-bridge.utils.ts';
import { useCanvasContext } from '#core/providers';
import { APP_MESSAGE_TYPE } from '@lemoncode/quickmock-bridge-protocol';
import { useEffect } from 'react';

export function useHeadlessRenderComplete(hasReceivedFileRef: {
  current: boolean;
}): void {
  const { howManyLoadedDocuments, shapes, stageRef } = useCanvasContext();

  useEffect(() => {
    if (!isHeadlessEnv() || !hasReceivedFileRef.current) return;

    let innerRafId = 0;
    // Double rAF: the first frame runs after React commits; the second waits
    // for Konva to paint the updated canvas, so Puppeteer's screenshot reflects it.
    // There was a previous issue when the canvas was blank because the screenshot ran before Konva painted.
    const outerRafId = requestAnimationFrame(() => {
      innerRafId = requestAnimationFrame(() => {
        sendToExtension({
          type: APP_MESSAGE_TYPE.RENDER_COMPLETE,
          payload: computeContentBbox(shapes, stageRef),
        });
      });
    });

    return () => {
      cancelAnimationFrame(outerRafId);
      cancelAnimationFrame(innerRafId);
    };
  }, [howManyLoadedDocuments]);
}
