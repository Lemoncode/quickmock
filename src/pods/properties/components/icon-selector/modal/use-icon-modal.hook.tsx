import { useState } from 'react';
import { iconCollection } from './icons';
import { Category, IconInfo } from '@/core/model';

export const useIconModal = (initialIcon: IconInfo) => {
  const [selectedIcon, setSelectedIcon] = useState<IconInfo>(initialIcon);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleIconSelected = (icon: IconInfo) => {
    setSelectedIcon(icon);
  };

  const listAllCategories = (): Category[] => {
    const categories: Category[] = [];
    iconCollection.forEach(icon => {
      icon.categories.forEach(category => {
        if (!categories.includes(category)) {
          categories.push(category);
        }
      });
    });
    return categories;
  };

  const filterIcons = (): IconInfo[] => {
    let filteredIcons: IconInfo[] = iconCollection;

    if (selectedCategory) {
      filteredIcons = filteredIcons.filter(icon =>
        icon.categories.includes(selectedCategory)
      );
    }

    if (searchTerm) {
      filteredIcons = filteredIcons.filter(icon =>
        icon.searchTerms.some(term =>
          term.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    return filteredIcons;
  };

  const isCategorySelected = (category: Category) => {
    return category === selectedCategory;
  };

  const isIconSelected = (icon: IconInfo) => {
    return icon.name.toLowerCase() === selectedIcon.name.toLowerCase();
  };

  return {
    selectedCategory,
    setSelectedCategory,
    selectedIcon,
    setSelectedIcon,
    searchTerm,
    setSearchTerm,
    handleIconSelected,
    listAllCategories,
    filterIcons,
    isCategorySelected,
    isIconSelected,
  };
};
