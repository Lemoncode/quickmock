export const calcTextWidth = (
  inputText: string,
  fontSize: number,
  _fontfamily: string
) => {
  const REGX_DEFS = {
    LOWERCASE_BIG: /[mwoq]/,
    LOWERCASE: /[a-z0-9]/,
    UPPERCASE_BIG: /[MWOQ]/,
    UPPERCASE: /[A-Z]/,
    MARKS: /[.,;:!?'"(){}\[\]\-]/,
    SPACE: /\s/,
    DEFAULT: 'default',
  };

  const calcLength = [...inputText].reduce((sum, current) => {
    const testChar = (regx: RegExp) => regx.test(current);
    const addLength = (value: number) => sum + fontSize * value;

    if (testChar(REGX_DEFS.LOWERCASE_BIG)) return addLength(0.85);
    if (testChar(REGX_DEFS.LOWERCASE)) return addLength(0.5);
    if (testChar(REGX_DEFS.SPACE)) return addLength(0.2);
    if (testChar(REGX_DEFS.UPPERCASE_BIG)) return addLength(0.95);
    if (testChar(REGX_DEFS.UPPERCASE)) return addLength(0.7);
    if (testChar(REGX_DEFS.MARKS)) return addLength(0.3);
    return addLength(0.5);
  }, 0);

  return calcLength;
};
