import React, { Dispatch, SetStateAction } from 'react';

/*
  This is a wrapper for useState

  In this case we want to execute some function whenever the state change

  For instance Undo / Redo functionallity.

  Whenever you do a setState you want to store it in the queue of changes
  so you can undo it later, instead of having to remember to call storeInUndoQueue
  you can just call _setState_ and it will do it for you.
*/

export function useStateWithInterceptor<S>(
  initialState: S[] | (() => S[]),
  shapesInterceptorFn: (shapes: S[]) => void
): [S[], Dispatch<SetStateAction<S[]>>, Dispatch<SetStateAction<S[]>>] {
  const [shapes, setInternalShapes] = React.useState<S[]>(initialState);

  const setShapes = (newShapes: React.SetStateAction<S[]>): void => {
    const updatedShapes =
      newShapes instanceof Function ? newShapes(shapes) : newShapes;
    shapesInterceptorFn(updatedShapes);
    setInternalShapes(newShapes);
  };

  const setShapesSkipInterceptor = (
    newShapes: React.SetStateAction<S[]>
  ): void => {
    return setInternalShapes(newShapes);
  };

  return [shapes, setShapes, setShapesSkipInterceptor];
}
