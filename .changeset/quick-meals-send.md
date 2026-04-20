---
'quickmock': minor
'@lemoncode/quickmock-mcp': minor
---

First public release of the QuickMock VS Code extension and its MCP server.

**`quickmock` (VS Code extension)**

- Custom editor for `.qm` files backed by the QuickMock web app, served inside a webview.

- `quickmock.appUrl` setting (default `https://quickmock.net/editor.html`) to point the editor and the MCP renderer at any QuickMock instance. Changes refresh open editors and respawn the MCP server.

- Automatic MCP server registration for VS Code / GitHub Copilot, Claude Code, Cursor, Windsurf and Claude Desktop, plus a dynamic `McpServerDefinitionProvider`.

- `QuickMock: Connect MCP Server` command to re-run registration on demand and inspect the available tools.

- Stale registrations pointing at a missing entrypoint are pruned automatically on activation.

**`@lemoncode/quickmock-mcp` (MCP server)**

- MCP tools to explore and render wireframes: `list_wireframes`, `get_wireframe_json`, `get_wireframe_pages`, `get_wireframe_assets` and `capture_wireframe`.

- Headless screenshot pipeline via `puppeteer-core` against the QuickMock app, using a postMessage bridge.

- On-demand Chromium download via `@puppeteer/browsers`, cached under `~/.quickmock/browsers`, so headless rendering works without relying on the user's local browser install.

- Reads the target app URL from `~/.quickmock/app-url` (written by the extension) with a production fallback, so the MCP works out of the box regardless of how it is spawned.
