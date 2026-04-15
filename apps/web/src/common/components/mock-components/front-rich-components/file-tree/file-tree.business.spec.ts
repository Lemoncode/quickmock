import { parseFileTreeText } from './file-tree.business';

describe('parseFileTreeText', () => {
  describe('Basic functionality', () => {
    it.each([
      ['+ Documents', 'folder', 'Documents'],
      ['- Downloads', 'subfolder', 'Downloads'],
      ['* README.md', 'file', 'README.md'],
      ['Projects', 'folder', 'Projects'],
    ])(
      'should parse %s as %s with text "%s"',
      (text, expectedType, expectedText) => {
        // Arrange

        // Act
        const result = parseFileTreeText(text);

        // Assert
        expect(result).toEqual([
          {
            type: expectedType,
            text: expectedText,
            level: 0,
          },
        ]);
      }
    );
  });

  describe('Indentation levels', () => {
    it.each<{ description: string; text: string; expectedLevel: number }>([
      {
        description: 'no spaces create level 0',
        text: '+ Root',
        expectedLevel: 0,
      },
      {
        description: '3 spaces create level 1',
        text: '   + Subfolder',
        expectedLevel: 1,
      },
      {
        description: '6 spaces create level 2',
        text: '      * File',
        expectedLevel: 2,
      },
      {
        description: '9 spaces create level 3',
        text: '         + Deep folder',
        expectedLevel: 3,
      },
    ])('$description', ({ text, expectedLevel }) => {
      // Arrange

      // Act
      const result = parseFileTreeText(text);

      // Assert
      expect(result[0].level).toBe(expectedLevel);
    });

    it('should handle indentation with non-standard spacing', () => {
      // Arrange
      const text = `  + Two spaces (level 0)
    + Four spaces (level 1)
     + Five spaces (level 1)
       + Seven spaces (level 2)`;

      // Act
      const result = parseFileTreeText(text);

      // Assert
      expect(result[0].level).toBe(0); // 2/3 = 0
      expect(result[1].level).toBe(1); // 4/3 = 1
      expect(result[2].level).toBe(1); // 5/3 = 1
      expect(result[3].level).toBe(2); // 7/3 = 2
    });

    it('should handle complex nested structure', () => {
      // Arrange
      const text = `+ Root
   - Subfolder 1
      * File 1
   + Subfolder 2
     - Deep subfolder
        * Deep file
         + Deep folder
               - Deep subfolder 2
                  * Deep file 2`;

      // Act
      const result = parseFileTreeText(text);

      // Assert
      expect(result).toEqual([
        { type: 'folder', text: 'Root', level: 0 },
        { type: 'subfolder', text: 'Subfolder 1', level: 1 },
        { type: 'file', text: 'File 1', level: 2 },
        { type: 'folder', text: 'Subfolder 2', level: 1 },
        { type: 'subfolder', text: 'Deep subfolder', level: 1 },
        { type: 'file', text: 'Deep file', level: 2 },
        { type: 'folder', text: 'Deep folder', level: 3 },
        { type: 'subfolder', text: 'Deep subfolder 2', level: 5 },
        { type: 'file', text: 'Deep file 2', level: 6 },
      ]);
    });
  });

  describe('Corner cases', () => {
    it.each<{ description: string; input: string; expected: any[] }>([
      {
        description: 'return empty array for empty string',
        input: '',
        expected: [],
      },
      {
        description:
          'filter out lines with only newlines between valid content',
        input: `

+ Folder

* File

`,
        expected: [
          { type: 'folder', text: 'Folder', level: 0 },
          { type: 'file', text: 'File', level: 0 },
        ],
      },
      {
        description: 'return empty array for text with only newlines',
        input: '\n\n\n',
        expected: [],
      },
    ])('should $description', ({ input, expected }) => {
      // Arrange

      // Act
      const result = parseFileTreeText(input);

      // Assert
      expect(result).toEqual(expected);
    });
  });

  describe('Edge cases with symbols', () => {
    it.each<{ text: string; expected: any[]; description: string }>([
      {
        description:
          'ignore extra spaces after the symbol and keep correct type',
        text: `+  Documents
-   Downloads  
*  README.md`,
        expected: [
          { type: 'folder', text: 'Documents', level: 0 },
          { type: 'subfolder', text: 'Downloads', level: 0 },
          { type: 'file', text: 'README.md', level: 0 },
        ],
      },
      {
        description: 'handle symbols without space after as plain text',
        text: `+
-
*`,
        expected: [
          { type: 'folder', text: '+', level: 0 },
          { type: 'folder', text: '-', level: 0 },
          { type: 'folder', text: '*', level: 0 },
        ],
      },
      {
        description: 'trim leading/trailing whitespace in text',
        text: `+  Documents  
- Downloads
*   README.md   `,
        expected: [
          { type: 'folder', text: 'Documents', level: 0 },
          { type: 'subfolder', text: 'Downloads', level: 0 },
          { type: 'file', text: 'README.md', level: 0 },
        ],
      },
      {
        description: 'recognize symbols with space but no text',
        text: `+        
-         
*         `,
        expected: [
          { type: 'folder', text: '', level: 0 },
          { type: 'subfolder', text: '', level: 0 },
          { type: 'file', text: '', level: 0 },
        ],
      },
      {
        description:
          'handle lines starting with symbols but not followed by space, as folder and plain text',
        text: `+Documents
-Downloads
*README.md`,
        expected: [
          { type: 'folder', text: '+Documents', level: 0 },
          { type: 'folder', text: '-Downloads', level: 0 },
          { type: 'folder', text: '*README.md', level: 0 },
        ],
      },
    ])('should $description', ({ text, expected }) => {
      // Arrange

      // Act
      const result = parseFileTreeText(text);

      // Assert
      expect(result).toEqual(expected);
    });
  });

  describe('Large indentation values', () => {
    it('should handle 27 spaces creating level 9 indentation', () => {
      // Arrange
      const spaces = '                           '; // 27 spaces

      // Act
      const text = `${spaces}+ Deep folder`;
      const result = parseFileTreeText(text);

      // Assert
      expect(result[0].level).toBe(9);
    });
  });
});
