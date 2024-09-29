import { describe, it, expect } from 'vitest';
import { mapTextToSections } from './accordion.business';

describe('mapTextToSections', () => {
  it('should return default sections when text is empty', () => {
    const emptyText = '';

    const result = mapTextToSections(emptyText);

    expect(result).toEqual({
      sections: ['Section A', 'Section B'],
      selectedSectionIndex: 0,
    });
  });

  it('should return 1 section and selectedSectionIndex = 0 when text has 1 section', () => {
    const singleSectionText = 'Section A';

    const result = mapTextToSections(singleSectionText);

    expect(result).toEqual({
      sections: ['Section A'],
      selectedSectionIndex: 0,
    });
  });

  it('should return 2 sections and selectedSectionIndex = 1 when second section starts with [*]', () => {
    const twoSectionsText = 'Section A\n[*]Section B';

    const result = mapTextToSections(twoSectionsText);

    expect(result).toEqual({
      sections: ['Section A', 'Section B'],
      selectedSectionIndex: 1,
    });
  });

  it('should return 2 sections and selectedSectionIndex = 0 when no section starts with [*]', () => {
    const twoSectionsText = 'Section A\nSection B';

    const result = mapTextToSections(twoSectionsText);

    expect(result).toEqual({
      sections: ['Section A', 'Section B'],
      selectedSectionIndex: 0,
    });
  });

  it('should pick the first section with [*] and remove [*] from all sections', () => {
    const multipleSelectedSectionsText =
      '[*]Section A\n[*]Section B\n[*]Section C';

    const result = mapTextToSections(multipleSelectedSectionsText);

    expect(result).toEqual({
      sections: ['Section A', 'Section B', 'Section C'],
      selectedSectionIndex: 0,
    });
  });

  it('should handle sections with special characters', () => {
    const textWithSpecialChars = 'Section @A!\n[*]Section #B$';

    const result = mapTextToSections(textWithSpecialChars);

    expect(result).toEqual({
      sections: ['Section @A!', 'Section #B$'],
      selectedSectionIndex: 1,
    });
  });

  it('should select the first marked section and remove [*] from all when multiple sections have [*]', () => {
    const multipleSelectedText =
      'Section A\n[*]Section B\nSection C\n[*]Section D';

    const result = mapTextToSections(multipleSelectedText);

    expect(result).toEqual({
      sections: ['Section A', 'Section B', 'Section C', 'Section D'],
      selectedSectionIndex: 1,
    });
  });
});
