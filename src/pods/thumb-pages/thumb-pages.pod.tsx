import React from 'react';
import classes from './thumb-pages.module.css';
import { useCanvasContext } from '@/core/providers';
import { PageTitleInlineEdit, ThumbPage } from './components';
import { PlusIcon } from '@/common/components/icons';
import { useMonitorDropThumb } from './monitor-drop-thumb.hook';

interface Props {
  isVisible: boolean;
}

export const ThumbPagesPod: React.FC<Props> = props => {
  const { isVisible } = props;
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

  useMonitorDropThumb();

  return (
    <div className={classes.container}>
      {fullDocument.pages.map((page, index) => (
        <React.Fragment key={page.id}>
          <div
            className={`${classes.container} ${
              page.id === getActivePage().id
                ? classes.activeThumb
                : classes.thumb
            }`}
          >
            <ThumbPage
              pageIndex={index}
              onSetActivePage={handleSetActivePage}
              setPageTitleBeingEdited={setPageTitleBeingEdited}
              isVisible={isVisible}
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
      <button
        className={classes.addButton}
        onClick={handleAddNewPage}
        title="add new page"
        aria-label="add new page"
      >
        <PlusIcon />
      </button>
    </div>
  );
};
