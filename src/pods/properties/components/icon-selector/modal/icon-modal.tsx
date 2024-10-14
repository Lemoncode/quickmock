import classes from './icon-modal.module.css';
import { IconInfo } from '@/core/model';
import { useModalDialogContext } from '@/core/providers/model-dialog-providers/model-dialog.provider';
import { useIconModal } from './use-icon-modal.hook';
import { IconModalSearchBar } from './components/searchbar.component';
import { IconModalCategories } from './components/categories.component';
import { IconList } from './components/icon-list.component';
import { useEffect } from 'react';
import { useCanvasContext } from '@/core/providers';

interface IconModalProps {
  actualIcon: IconInfo;
  onChange: (icon: IconInfo) => void;
}

export const IconModal: React.FC<IconModalProps> = props => {
  const { actualIcon, onChange } = props;
  const { setIsInlineEditing } = useCanvasContext();
  const { closeModal } = useModalDialogContext();

  const {
    selectedIcon,
    handleIconSelected,
    selectedCategory,
    setSelectedCategory,
    searchTerm,
    setSearchTerm,
    isIconSelected,
    listAllCategories,
    isCategorySelected,
    filterIcons,
  } = useIconModal(actualIcon);

  const handleSelection = () => {
    onChange(selectedIcon);
    closeModal();
  };

  useEffect(() => {
    setIsInlineEditing(true);

    return () => {
      setIsInlineEditing(false);
    };
  }, []);

  return (
    <div className={classes.container}>
      <h2 className={classes.title}>Choose your icon</h2>

      <IconModalSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <IconModalCategories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isCategorySelected={isCategorySelected}
        listAllCategories={listAllCategories}
      />

      <IconList
        isIconSelected={isIconSelected}
        handleIconSelected={handleIconSelected}
        filterIcons={filterIcons}
      />

      <button className={classes.button} onClick={handleSelection}>
        Select
      </button>
    </div>
  );
};
