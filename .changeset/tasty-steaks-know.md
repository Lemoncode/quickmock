---
'quickmock': patch
---

Fix editor failing to load files opened from outside the workspace. The webview HTML was assigned before registering `onDidReceiveMessage`, causing a race where the initial `READY` / `WEBVIEW_READY` message from the app could be lost and the file content never delivered. The listener is now registered before the HTML assignment.
