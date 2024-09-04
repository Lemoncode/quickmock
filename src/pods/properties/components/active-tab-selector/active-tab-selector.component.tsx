import classes from './active-tab-selector.component.module.css';

interface Props {
  text?: string;
  type?: string;
  activeTab: number;
  label: string;
  onChange: (activeTab: number) => void;
}

export const ActiveTabSelector: React.FC<Props> = ({
  text,
  type,
  activeTab,
  label,
  onChange,
}) => {
  // Function to parse the tabsbar text and get the names of the tabs
  const parseTabsBarText = (text: string): string[] => {
    return text
      .trim()
      .split(',')
      .map(tab => tab.trim());
  };

  // Checking whether the type is tabsBar and parsing the text
  const isTabsBar = type === 'tabsBar';
  const tabs = isTabsBar && text ? parseTabsBarText(text) : [];

  const handleTabChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    isTabsBar &&
    tabs.length > 0 && (
      <div className={classes.container}>
        <p>{label}</p>
        <select value={activeTab} onChange={handleTabChange}>
          {tabs.map((tab, index) => (
            <option key={index} value={index}>
              {tab}
            </option>
          ))}
        </select>
      </div>
    )
  );
};
