export const parseTextWithFormatting = (text: string): string => {
  // Apply <br>
  let parsedText = text.replace(/(?:\\n|<br>)/g, '<br>');

  // Replace *text* <strong>text</strong>
  parsedText = parsedText.replace(/\*(.*?)\*/g, '<strong>$1</strong>');

  // Replace _text_ <em>text</em>
  parsedText = parsedText.replace(/_(.*?)_/g, '<em>$1</em>');

  // Replace ~text~ <u>text</u>
  parsedText = parsedText.replace(/\~(.*?)\~/g, '<u>$1</u>');

  return parsedText;
};
