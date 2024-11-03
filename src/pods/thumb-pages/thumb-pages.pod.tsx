import React from 'react';
import classes from './thumb-pages.module.css';
import { useCanvasContext } from '@/core/providers';
import { PageTitleInlineEdit, ThumbPage } from './components';

export const ThumbPagesPod: React.FC = () => {
  const { fullDocument, addNewPage, setActivePage } = useCanvasContext();
  const [pageTitleBeingEdited, setPageTitleBeingEdited] = React.useState<
    number | null
  >(null);

  const handleAddNewPage = () => {
    addNewPage();
  };

  const handleSetActivePage = (pageId: string) => {
    setActivePage(pageId);
  };

  return (
    <div className={classes.container}>
      {fullDocument.pages.map((page, index) => (
        <React.Fragment key={page.id}>
          <ThumbPage
            pageIndex={index}
            onSetActivePage={handleSetActivePage}
            setPageTitleBeingEdited={setPageTitleBeingEdited}
          />
          {pageTitleBeingEdited === index ? (
            <PageTitleInlineEdit
              pageIndex={index}
              setPageTitleBeingEdited={setPageTitleBeingEdited}
            />
          ) : (
            <div onDoubleClick={() => setPageTitleBeingEdited(index)}>
              {page.name}
            </div>
          )}
        </React.Fragment>
      ))}
      <button onClick={handleAddNewPage}>Add new page</button>
    </div>
  );
};
