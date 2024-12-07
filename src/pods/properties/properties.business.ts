import { OtherProps, ShapeModel } from '@/core/model';
import {
  PropsValueTypes,
  CommonSelectedPropsAndValues,
  multiSelectEnabledProperties,
} from './properties.model';

// Helper function to check if a property is defined in all selected shapes
const isPropertyDefinedInAllShapes = (
  selectedShapes: ShapeModel[],
  prop: keyof OtherProps
): boolean => {
  return selectedShapes.every(
    shape => shape.otherProps && shape.otherProps[prop] !== undefined
  );
};

// Helper function to get the common value of a property, or undefined if values differ
const getCommonValueForProperty = (
  selectedShapes: ShapeModel[],
  prop: keyof OtherProps
): PropsValueTypes => {
  const values = selectedShapes.map(
    shape => shape.otherProps && shape.otherProps[prop]
  );
  return values.every(value => value === values[0]) ? values[0] : undefined;
};

// Main function to extract common properties and their values
export const extractMultiplePropsInCommon = (
  selectedShapes: ShapeModel[]
): CommonSelectedPropsAndValues => {
  const commonProps: CommonSelectedPropsAndValues = {};

  multiSelectEnabledProperties.forEach(prop => {
    if (isPropertyDefinedInAllShapes(selectedShapes, prop)) {
      commonProps[prop] = getCommonValueForProperty(selectedShapes, prop);
    }
  });

  return commonProps;
};
