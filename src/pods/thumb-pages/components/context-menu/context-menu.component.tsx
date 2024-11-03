import React from 'react';
import { useCanvasContext } from '@/core/providers';
import classes from './context-menu.component.module.css';
import { CopyIcon, DeleteIcon, PencilIcon } from '@/common/components/icons';

interface ThumbPageContextMenuProps {
  contextMenuRef: React.RefObject<HTMLDivElement>;
  setShowContextMenu: (show: boolean) => void;
  pageIndex: number;
  setPageTitleBeingEdited: (index: number) => void;
}

export const ThumbPageContextMenu: React.FunctionComponent<
  ThumbPageContextMenuProps
> = props => {
  const {
    contextMenuRef,
    setShowContextMenu,
    pageIndex,
    setPageTitleBeingEdited,
  } = props;
  const {
    setIsThumbnailContextMenuVisible,
    fullDocument,
    duplicatePage,
    deletePage,
  } = useCanvasContext();

  enum ContextButtonType {
    'Duplicate',
    'Rename',
    'Delete',
  }

  const handleClickOnContextButton = (
    event: React.MouseEvent,
    buttonClicked: ContextButtonType
  ) => {
    event.stopPropagation();
    switch (buttonClicked) {
      case ContextButtonType.Duplicate:
        duplicatePage(pageIndex);
        break;
      case ContextButtonType.Rename:
        console.log('Rename');
        setPageTitleBeingEdited(pageIndex);
        break;
      case ContextButtonType.Delete:
        if (fullDocument.pages.length !== 1) {
          deletePage(pageIndex);
        }
        break;
    }
    setShowContextMenu(false);
    setIsThumbnailContextMenuVisible(false);
  };

  return (
    <div ref={contextMenuRef} className={classes['context-menu']}>
      <div
        onClick={event =>
          handleClickOnContextButton(event, ContextButtonType.Duplicate)
        }
        className={classes.container}
      >
        <p>Duplicate</p>
        <CopyIcon />
      </div>
      <div
        onClick={event =>
          handleClickOnContextButton(event, ContextButtonType.Rename)
        }
        className={classes.container}
      >
        <p>Rename</p>
        <PencilIcon />
      </div>
      <div
        onClick={event =>
          handleClickOnContextButton(event, ContextButtonType.Delete)
        }
        className={
          fullDocument.pages.length === 1
            ? `${classes.container} ${classes.disabled}`
            : `${classes.container}`
        }
      >
        <p>Delete</p>
        <DeleteIcon />
      </div>
    </div>
  );
};
