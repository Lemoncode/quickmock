import * as vscode from 'vscode';
import { getMcpEntrypointPath } from '#core/paths';
import { registerMcpServer } from './mcp-registration';

const TOOLS = [
  {
    name: 'list_wireframes',
    description: 'List all .qm files in the workspace',
  },
  {
    name: 'get_wireframe_json',
    description: 'Read the JSON content of a .qm file',
  },
  {
    name: 'capture_wireframe',
    description: 'Render a .qm file and return a PNG screenshot',
  },
];

const STATUS_ICON: Record<string, string> = {
  registered: '$(check)',
  skipped: '$(circle-slash)',
  error: '$(error)',
};

export const registerConnectMcpCommand = (
  context: vscode.ExtensionContext
): vscode.Disposable =>
  vscode.commands.registerCommand('quickmock.connectMcp', async () => {
    const serverPath = getMcpEntrypointPath(context);

    const results = await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: 'QuickMock: Connecting MCP server…',
        cancellable: false,
      },
      () => registerMcpServer(context)
    );

    const items: vscode.QuickPickItem[] = [
      { label: 'Providers', kind: vscode.QuickPickItemKind.Separator },
      ...results.map(r => ({
        label: `${STATUS_ICON[r.status]} ${r.label}`,
        description: r.status === 'registered' ? 'registered' : r.status,
        detail: r.detail,
      })),
      { label: 'Available tools', kind: vscode.QuickPickItemKind.Separator },
      ...TOOLS.map(t => ({
        label: `$(tools) ${t.name}`,
        description: t.description,
      })),
      { label: 'Server', kind: vscode.QuickPickItemKind.Separator },
      {
        label: '$(file-code) Server path',
        description: serverPath,
        detail: 'Click to copy',
      },
    ];

    const selected = await vscode.window.showQuickPick(items, {
      title: 'QuickMock MCP Server',
      placeHolder: 'Registration complete — select an item to copy its value',
      matchOnDescription: true,
    });

    if (selected?.description === serverPath) {
      await vscode.env.clipboard.writeText(serverPath);
      vscode.window.showInformationMessage('Server path copied to clipboard.');
    }
  });
