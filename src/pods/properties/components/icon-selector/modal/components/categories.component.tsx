import { Category } from '@/core/model';
import classes from './categories.component.module.css';

interface IconModalCategoriesProps {
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
  isCategorySelected: (category: Category) => boolean;
  listAllCategories: () => Category[];
}

export const IconModalCategories: React.FC<
  IconModalCategoriesProps
> = props => {
  const {
    selectedCategory,
    setSelectedCategory,
    isCategorySelected,
    listAllCategories,
  } = props;

  return (
    <div className={classes.categories}>
      <h3 className={classes.categoriesTitle}>Categories:</h3>
      <button
        onClick={() => setSelectedCategory(null)}
        className={`${classes.category} ${!selectedCategory ? classes.categorySelected : ''}`}
      >
        All
      </button>
      {listAllCategories().map(category => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`${classes.category} ${isCategorySelected(category) ? classes.categorySelected : ''}`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
