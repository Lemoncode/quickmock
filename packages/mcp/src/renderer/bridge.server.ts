import { createServer, type Server } from 'node:http'
import { AddressInfo } from 'node:net'
import { QUICKMOCK_URL } from './renderer.consts'

export interface BridgeServer {
  server: Server
  port: number
}

/** HTTP server that serves the Puppeteer ↔ QuickMock iframe bridge page. */
export function startBridgeServer(): Promise<BridgeServer> {
  return new Promise((resolve, reject) => {
    const server = createServer((_req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
      res.end(buildBridgeHtml())
    })

    server.on('error', reject)

    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address() as AddressInfo
      resolve({ server, port })
    })
  })
}

function buildBridgeHtml(): string {
  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { overflow: hidden; background: #fff; }
    iframe { display: block; width: 100vw; height: 100vh; border: none; }
  </style>
</head>
<body>
  <iframe id="qm" src="${QUICKMOCK_URL}" allow="clipboard-read; clipboard-write"></iframe>
  <script>
    window.__qmReady = false
    window.__renderComplete = false
    window.__renderBbox = null
    window.__iframeLoaded = false

    const iframe = document.getElementById('qm')
    iframe.addEventListener('load', function () { window.__iframeLoaded = true })

    window.addEventListener('message', function (event) {
      var type = event.data && event.data.type

      // Messages coming UP from the QuickMock iframe
      if (event.source === iframe.contentWindow) {
        if (type === 'qm:ready')           window.__qmReady = true
        if (type === 'qm:render-complete') {
          window.__renderComplete = true
          window.__renderBbox = event.data.payload ?? null
        }
        return
      }

      // Messages coming DOWN from Puppeteer (page.evaluate) → forward to iframe
      if (iframe.contentWindow) {
        iframe.contentWindow.postMessage(event.data, '*')
      }
    })
  </script>
</body>
</html>`
}
