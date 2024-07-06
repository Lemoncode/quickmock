// TODO: this should be moved common and unit tests added
export function getDecimalPart(num: number): number {
  // Get intenger part
  const integerPart = Math.trunc(num);
  // Substract integer to num obtain decimal part
  const decimalPart = num - integerPart;
  return decimalPart;
}
