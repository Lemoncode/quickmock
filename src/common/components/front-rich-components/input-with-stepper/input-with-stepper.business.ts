import React from 'react';

export const useHandleCounterInputWithStepper = () => {
  const [value, setValue] = React.useState(0);

  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleDecrement = () => {
    setValue(value - 1);
  };

  return { value, handleIncrement, handleDecrement };
};
