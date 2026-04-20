type TextContent = { type: 'text'; text: string };
type ImageContent = { type: 'image'; data: string; mimeType: string };
type ToolContent = TextContent | ImageContent;

export function toolText(text: string) {
  return { content: [{ type: 'text' as const, text }] };
}

export function toolImage(data: string, mimeType: string) {
  return { content: [{ type: 'image' as const, data, mimeType }] };
}

export function toolMultiContent(items: ToolContent[]) {
  return { content: items };
}

export function toolError(text: string) {
  return { content: [{ type: 'text' as const, text }], isError: true as const };
}
