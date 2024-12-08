import { useMemo } from 'react';
import { CommonSelectedPropsAndValues } from '../properties.model';
import { OtherProps } from '@/core/model';

interface Props {
  singleSelection: boolean;
  multipleSelectionPropsInCommon: CommonSelectedPropsAndValues;
  propKey: keyof OtherProps;
  propValue: unknown;
  children: React.ReactNode;
}

export const ShowProp: React.FC<Props> = props => {
  const {
    singleSelection,
    multipleSelectionPropsInCommon,
    propKey,
    propValue,
    children,
  } = props;

  const showProp: boolean = useMemo(
    () =>
      (singleSelection && propValue !== undefined) ||
      multipleSelectionPropsInCommon[propKey] !== undefined,
    [multipleSelectionPropsInCommon, propKey, propValue]
  );

  return <>{showProp ? children : null}</>;
};
