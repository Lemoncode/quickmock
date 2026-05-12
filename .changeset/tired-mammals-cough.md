---
'quickmock': patch
---

Fix component-gallery drag-and-drop in the VS Code extension on macOS,
where HTML5 drag events targeting the inner iframe were dispatched to
the webview shell instead of into the iframe (microsoft/vscode#193558).
Linux and Windows are unaffected.