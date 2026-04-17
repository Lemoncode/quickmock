export class DocumentRegistry {
  private readonly map = new Map<string, string>();

  set(fsPath: string, content: string): void {
    this.map.set(fsPath, content);
  }

  get(fsPath: string): string | undefined {
    return this.map.get(fsPath);
  }

  delete(fsPath: string): void {
    this.map.delete(fsPath);
  }
}

export const documentRegistry = new DocumentRegistry();
