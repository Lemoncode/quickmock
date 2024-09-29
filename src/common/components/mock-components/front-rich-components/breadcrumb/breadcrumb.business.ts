export interface SectionsInfo {
  sections: string[];
}

export const mapTextToSections = (text: string): SectionsInfo => {
  return {
    sections: text.split(',').map(section => section.replace(/^\[\*\]/, '')),
  };
};

export const calculatePositions = (
  sections: string[],
  textRefs: React.MutableRefObject<any[]>
): { positions: number[]; groupWidth: number } => {
  const newPositions: number[] = [];
  let accumulatedWidth = 0;

  sections.forEach((_, index) => {
    const textNode = textRefs.current[index];
    if (textNode) {
      const textWidth = textNode.getTextWidth();
      newPositions.push(accumulatedWidth);
      accumulatedWidth += textWidth + 20;
    }
  });

  return { positions: newPositions, groupWidth: accumulatedWidth };
};
