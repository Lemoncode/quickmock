export interface RegistryClient {
  /** Returns live in-memory content for a file open in the editor, or null. */
  getDocument(fsPath: string): Promise<string | null>;
}

export const nullClient: RegistryClient = {
  getDocument: async () => null,
};
