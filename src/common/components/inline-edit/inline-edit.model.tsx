//export type EditType = 'input' | 'textarea' ;

type PositionType = 'absolute' | 'relative' | 'fixed' | 'static';

export interface StyleDivProps {
  position: PositionType;
  top: string | number;
  left: string | number;
  width: string | number;
  height: string | number;
}
