import React, { useEffect } from 'react';

type MustBeANumberError =
  | 'You must enter a number'
  | 'You must enter a integer number';

interface handleCounterInputWithStepperHook {
  valueToString: string | MustBeANumberError;
  handleIncrement: () => void;
  handleDecrement: () => void;
  isTextANumber: boolean;
}

const MUST_BE_A_NUMBER: MustBeANumberError = 'You must enter a number';

export const useHandleCounterInputWithStepper = (
  text: string
): handleCounterInputWithStepperHook => {
  const [value, setValue] = React.useState<number | MustBeANumberError>(0);

  const isTextANumber: boolean = !isNaN(parseInt(text));

  useEffect(() => {
    if (isTextANumber) {
      setValue(parseInt(text));
    } else {
      setValue(MUST_BE_A_NUMBER);
    }
  }, [text]);

  const handleIncrement = () => {
    if (typeof value === 'number') {
      setValue(value + 1);
    }
  };

  const handleDecrement = () => {
    if (typeof value === 'number') {
      if (value === 0) return;
      setValue(value - 1);
    }
  };

  const valueToString: string =
    typeof value === 'string' ? value : value.toString();

  return {
    valueToString,
    handleIncrement,
    handleDecrement,
    isTextANumber,
  };
};

export const adjustAlignmentByDigitCount = (
  value: string | MustBeANumberError
): number => {
  const valueToNumber = Number(value);

  const pixelsToMove = 20;

  if (isNaN(valueToNumber)) {
    return pixelsToMove;
  }

  return valueToNumber > 9 && valueToNumber < 100
    ? pixelsToMove + 8
    : valueToNumber > 99
      ? pixelsToMove + 16
      : pixelsToMove;
};
