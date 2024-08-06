export const addPxSuffix = (value: number) => {
  return `${value}px`;
};


export const calculateCoordinateValue = (value: number, scale: number) => {
  return addPxSuffix(value * scale);
};





