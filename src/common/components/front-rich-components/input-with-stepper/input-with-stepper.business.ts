import React from 'react';

export const useHandleCounterInputWithStepper = () => {
  const [value, setValue] = React.useState(0);

  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleDecrement = () => {
    if (value === 0) return;
    setValue(value - 1);
  };

  return { value, handleIncrement, handleDecrement };
};

export const adjustAlignmentByDigitCount = (value: number): number => {
  const pixelsToMove = 20;

  return value > 9 && value < 100
    ? pixelsToMove + 8
    : value > 99
      ? pixelsToMove + 16
      : pixelsToMove;
};
