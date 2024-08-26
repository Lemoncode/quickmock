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
  initialState: S | (() => S),
  documentInterceptorFn: (schema: S) => void
): [S, Dispatch<SetStateAction<S>>, Dispatch<SetStateAction<S>>] {
  const [document, setInternalDocument] = React.useState<S>(initialState);

  const setDocument = (newDocument: React.SetStateAction<S>): void => {
    setInternalDocument(prevDocument => {
      const updatedDocument =
        newDocument instanceof Function
          ? newDocument(prevDocument)
          : newDocument;
      documentInterceptorFn(updatedDocument);
      return updatedDocument;
    });
  };

  const setDocumentSkipInterceptor = (
    newDocument: React.SetStateAction<S>
  ): void => {
    return setInternalDocument(newDocument);
  };

  return [document, setDocument, setDocumentSkipInterceptor];
}
