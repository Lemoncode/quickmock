# @lemoncode/quickmock-vscode-extension

## 0.3.0

### Minor Changes

- a385bac: Added create new wireframe button on VSCode status bar.

### Patch Changes

- 79b48b7: Added basic README.md.
- c955c05: Fix component-gallery drag-and-drop in the VS Code extension on macOS,
  where HTML5 drag events targeting the inner iframe were dispatched to
  the webview shell instead of into the iframe (microsoft/vscode#193558).
  Linux and Windows are unaffected.
- Updated dependencies [79b48b7]
  - @lemoncode/quickmock-mcp@0.1.1

## 0.2.0

### Minor Changes

- 3cd4892: Toolbar's **New** button now creates a real `.qm` file when running inside the VS Code extension instead of just clearing the canvas.

### Patch Changes

- b7f9cf1: Fix editor failing to load files opened from outside the workspace. The webview HTML was assigned before registering `onDidReceiveMessage`, causing a race where the initial `READY` / `WEBVIEW_READY` message from the app could be lost and the file content never delivered. The listener is now registered before the HTML assignment.

## 0.1.0

### Minor Changes

- 2282316: First public release of the QuickMock VS Code extension and its MCP server.

  **`quickmock` (VS Code extension)**
  - Custom editor for `.qm` files backed by the QuickMock web app, served inside a webview.
  - `quickmock.appUrl` setting (default `https://quickmock.net/editor.html`) to point the editor and the MCP renderer at any QuickMock instance. Changes refresh open editors and respawn the MCP server.
  - Automatic MCP server registration for VS Code / GitHub Copilot, Claude Code, Cursor, Windsurf and Claude Desktop, plus a dynamic `McpServerDefinitionProvider`. Existing entries are refreshed on activation so users always end up pointing at the right MCP invocation.
  - The MCP server is no longer bundled inside the `.vsix`. In production the extension spawns it on demand via `npx -y @lemoncode/quickmock-mcp`, so users always run the latest published MCP without waiting for an extension release. In development it resolves the local workspace build.

  **`@lemoncode/quickmock-mcp` (MCP server)**
  - MCP tools to explore and render wireframes: `list_wireframes`, `get_wireframe_json`, `get_wireframe_pages`, `get_wireframe_assets` and `capture_wireframe`.
  - Headless screenshot pipeline via `puppeteer-core` against the QuickMock app, using a postMessage bridge.
  - On-demand Chromium download via `@puppeteer/browsers`, cached under `~/.quickmock/browsers`, so headless rendering works without relying on the user's local browser install.
  - Reads the target app URL from `~/.quickmock/app-url` (written by the extension) with a production fallback, so the MCP works out of the box regardless of how it is spawned.

### Patch Changes

- Updated dependencies [2282316]
  - @lemoncode/quickmock-mcp@0.1.0

## 0.0.1

### Patch Changes

- 53588d0: Initial version
