import classes from './searchbar.component.module.css';

interface IconModalSearchBarProps {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
}

export const IconModalSearchBar: React.FC<IconModalSearchBarProps> = props => {
  const { searchTerm, setSearchTerm } = props;
  return (
    <div className={classes.searchContainer}>
      <h3 className={classes.searchTitle}>Search:</h3>
      <input
        type="text"
        placeholder="Search icons..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className={classes.searchInput}
      />
    </div>
  );
};
