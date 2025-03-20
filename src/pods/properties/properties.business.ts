import { OtherProps, ShapeModel } from '@/core/model';
import {
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
// TODO: Right now we are getting the first default value of the selectedShape
// this may not be accurate, maybe we could check if all values are not the same
// define a default prop for all the entries
/*
const getCommonValueForProperty = (
  selectedShapes: ShapeModel[],
  prop: keyof OtherProps
): PropsValueTypes => {
  const values = selectedShapes.map(
    shape => shape.otherProps && shape.otherProps[prop]
  );

  // TODO: Here is the trick, we should return a default value
  // if the commonValue is not se or where it is consumed
  return values.every(value => value === values[0]) ? values[0] : undefined;
};
*/

// Main function to extract common properties and their values
export const extractMultiplePropsInCommon = (
  selectedShapes: ShapeModel[]
): CommonSelectedPropsAndValues => {
  const commonProps: CommonSelectedPropsAndValues = {};

  multiSelectEnabledProperties.forEach(prop => {
    if (isPropertyDefinedInAllShapes(selectedShapes, prop)) {
      //commonProps[prop] = getCommonValueForProperty(selectedShapes, prop);
      if (selectedShapes.length > 1 && selectedShapes[0].otherProps) {
        commonProps[prop] = selectedShapes[0].otherProps[prop];
      }
    }
  });

  return commonProps;
};
