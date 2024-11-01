import React from 'react';
import { useCanvasContext } from '@/core/providers';
import classes from './context-menu.component.module.css';
import { CopyIcon, DeleteIcon } from '@/common/components/icons';

interface ThumbPageContextMenuProps {
  contextMenuRef: React.RefObject<HTMLDivElement>;
  setShowContextMenu: (show: boolean) => void;
  pageIndex: number;
}

export const ThumbPageContextMenu: React.FunctionComponent<
  ThumbPageContextMenuProps
> = props => {
  const { contextMenuRef, setShowContextMenu, pageIndex } = props;
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
        break;
      case ContextButtonType.Delete:
        deletePage(pageIndex);
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