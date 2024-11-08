import React from 'react';
import classes from './thumb-pages.module.css';
import { useCanvasContext } from '@/core/providers';
import { PageTitleInlineEdit, ThumbPage } from './components';

export const ThumbPagesPod: React.FC = () => {
  const { fullDocument, addNewPage, setActivePage, getActivePage } =
    useCanvasContext();
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
          <div
            className={`${classes.container} ${
              page.id === getActivePage().id ? classes.activeThumb : ''
            }`}
          >
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
              <div
                onDoubleClick={() => setPageTitleBeingEdited(index)}
                className={
                  page.id === getActivePage().id ? classes.activeText : ''
                }
              >
                {page.name}
              </div>
            )}
          </div>
        </React.Fragment>
      ))}
      <button onClick={handleAddNewPage}>Add new page</button>
    </div>
  );
};
