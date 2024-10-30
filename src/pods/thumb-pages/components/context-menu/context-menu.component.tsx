import React from 'react';
import { useCanvasContext } from '@/core/providers';
import classes from './context-menu.component.module.css';
import { CopyIcon, DeleteIcon, PencilIcon } from '@/common/components/icons';

interface ThumbPageContextMenuProps {
  contextMenuRef: React.RefObject<HTMLDivElement>;
  setShowContextMenu: (show: boolean) => void;
}

export const ThumbPageContextMenu: React.FunctionComponent<
  ThumbPageContextMenuProps
> = props => {
  const { contextMenuRef, setShowContextMenu } = props;
  const { setIsThumbnailContextMenuVisible } = useCanvasContext();

  enum ContextButtonType {
    'Duplicate',
    'Rename',
    'Delete',
  }

  const handleClickOnContextButton = (buttonClicked: ContextButtonType) => {
    switch (buttonClicked) {
      case ContextButtonType.Duplicate:
        console.log('Duplicate');
        break;
      case ContextButtonType.Rename:
        console.log('Rename');
        break;
      case ContextButtonType.Delete:
        console.log('Delete');
        break;
    }
    setShowContextMenu(false);
    setIsThumbnailContextMenuVisible(false);
  };

  return (
    <div ref={contextMenuRef} className={classes['context-menu']}>
      <div
        onClick={() => handleClickOnContextButton(ContextButtonType.Duplicate)}
        className={classes.container}
      >
        <p>Duplicate</p>
        <CopyIcon />
      </div>
      <div
        onClick={() => handleClickOnContextButton(ContextButtonType.Rename)}
        className={classes.container}
      >
        <p>Rename</p>
        <PencilIcon />
      </div>
      <div
        onClick={() => handleClickOnContextButton(ContextButtonType.Delete)}
        className={classes.container}
      >
        <p>Delete</p>
        <DeleteIcon />
      </div>
    </div>
  );
};
